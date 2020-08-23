from . import api
from flask import jsonify, render_template, request
from server.models import Asset, Income, Outcome
from server import db
from sqlalchemy import func, and_
from datetime import datetime, timedelta
import pandas as pd


@api.route('/')
def index():
    return render_template('index.html')


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
    record = request.json
    income = Income(**record)
    db.session.add(income)
    db.session.commit()
    return jsonify(data=income.to_dict())


@api.route('/income', methods=['GET', "DELETE"])
def incomes():
    if request.method == "GET":
        items = db.session.query(Income).order_by(Income.create_time.desc()).limit(20).all()
        data = [item.to_dict() for item in items]
        return jsonify(data=data)
    if request.method == "DELETE":
        id = request.args.get("id")
        income = db.session.query(Income).filter_by(id=id).first()
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
    df['month'] = df.create_time.dt.month.astype(str) + "月"
    df['year'] = df.create_time.dt.year
    df['week'] = df.create_time.dt.week.astype(str) + "周"
    df = df[["amount", date_type]]
    df = df.groupby(by=[date_type]).sum()
    df["title"] = df.index
    df = df.sort_values(by=["title"], ascending=True)
    payload = {"items": df.to_dict(orient="records"), "trend": {}}
    return jsonify(data=payload)
