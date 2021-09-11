import json
from . import api

from flask import jsonify, render_template, request, make_response, session
from server.model import Asset, Income, Outcome, Debt, Orders, Device
from server.models.base import db
from sqlalchemy import func, and_
from datetime import datetime, timedelta
import pandas as pd
import logging
from config import Config
from server import utils

model_dict = {
    "income": Income,
    "outcome": Outcome,
    "asset": Asset,
    "debt": Debt
}


@api.route('/index')
def index():
    return render_template('/index.html')


@api.route('/summary')
def summary():
    sum_asset = db.session.query(func.sum(Asset.amount)).group_by(Asset.create_time).order_by(
        Asset.create_time.desc()).limit(1).first()
    sum_income = db.session.query(func.sum(Income.amount)).first()
    sum_outcome = db.session.query(func.sum(Outcome.amount)).first()
    payload = {
        "asset": round(sum_asset[0], 2),
        "income": round(sum_income[0], 2),
        "outcome": round(sum_outcome[0], 2)
    }
    return jsonify(payload)


@api.route('/add_record', methods=['POST'])
def add_record():
    record = dict(request.json)
    del record['create_time']
    model = model_dict.get(record['model'])
    del record['model']
    income = model(**record)
    db.session.add(income)
    db.session.commit()
    return jsonify(data=income.to_dict())


@api.route('/model', methods=['GET', "DELETE"])
def incomes():
    if request.method == "GET":
        model = model_dict[request.args.get("model")]
        items = db.session.query(model).order_by(model.create_time.desc()).limit(20).all()
        data = [item.to_dict() for item in items]
        return jsonify(data=data)
    if request.method == "DELETE":
        id = request.args.get("id")
        model = model_dict[request.args.get("model")]
        income = db.session.query(model).filter_by(id=id).first()
        if income:
            db.session.delete(income)
            db.session.commit()
            return jsonify(status="ok")
        else:
            return jsonify(status="fail")


@api.route('/card_data', methods=['GET', "DELETE"])
def card_data():
    start_time = request.args.get('startTime')
    end_time = datetime.strptime(request.args.get('endTime'), "%Y-%m-%d")
    end_time = end_time + timedelta(days=1)
    catalog = request.args.get('catalog')
    date_type = request.args.get('dateType')
    query = db.session.query(Income) \
        .filter(and_(Income.create_time >= start_time,
                     Income.create_time <= end_time)) \
        .order_by(Income.create_time.desc())
    df = pd.read_sql_query(query.statement, db.engine)
    df['day'] = df.create_time.dt.strftime('%m-%d')
    if catalog != "全部":
        df = df[df.catalog == catalog]
    df['month'] = df.create_time.dt.month
    df['year'] = df.create_time.dt.year
    df['week'] = df.create_time.dt.week
    df = df[["amount", date_type]]
    df = df.groupby(by=[date_type]).sum()
    df["title"] = df.index
    df = df.sort_values(by=["title"], ascending=True)
    payload = {"items": df.to_dict(orient="records"), "trend": {}, "dateType": date_type}
    return jsonify(data=payload)


@api.route("/get_code", methods=["POST"])
def get_code():
    order_id = request.json.get("order_id")
    device_uuid = request.json.get("uuid")
    order = db.session.query(Orders).filter_by(order_id=order_id).first()
    if session.get("user_id"):
        username = session.get("username")
        logging.info(f"user <{username}> is logged in, skip check device ")
        return utils.fetch_code(order, Config.SERVER_HOST)
    if not order.is_valid:
        return "you account is suspended, click this url to buy another one"
    device_uuids = [device.device_uuid for device in order.devices]
    if device_uuid in device_uuids:
        return utils.fetch_code(order, Config.SERVER_HOST)
    else:
        if len(device_uuids) >= 3:
            return make_response("WARNING", 401)
        device = Device(device_uuid=device_uuid)
        order.devices.append(device)
        db.session.commit()
        # todo give code to user
        return jsonify(data=order.to_user())  # todo
