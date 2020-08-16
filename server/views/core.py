from . import api
from flask import jsonify, render_template
from server.models import Asset, Income, Outcome
from server import db
from sqlalchemy import func


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
