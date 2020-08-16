from . import api
from flask import jsonify, render_template, request
from server.models import Asset, Income, Outcome
from server import db
from sqlalchemy import func
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
    return jsonify(status="ok")


@api.route('/income', methods=['GET', "DELETE"])
def incomes():
    if request.method == "GET":
        sql = "select * from income order by create_time desc limit 50"
        df = pd.read_sql_query(sql, db.engine, parse_dates=["create_time", "update_time"])
        df['create_time'] = df['create_time'].map(lambda x: x.strftime("%Y-%m-%d"))
        data = df.to_dict(orient='records')
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
