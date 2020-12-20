# -*- coding:utf-8 -*-
# -*- coding:utf-8 -*-
from flask import make_response, request
from server.models.base import db
from server.model import Membership, Orders
from server.model import Income
from server.utils import parse_human_time

from .base import BaseResource, paginate
from flask import jsonify


class OrdersResource(BaseResource):

    def get(self):
        items = Orders.all().all()
        data = [item.to_dict() for item in items]
        return jsonify(data=data)


class OrderResource(BaseResource):

    def post(self):
        form = dict(request.json)
        form['start_time'] = parse_human_time(form['start_time'])
        obj = Orders.create_one(form)
        # items = Orders.all().all()
        # data = [item.to_dict() for item in items]
        return jsonify(data=obj.to_dict())

    def get(self):
        order_id = request.args.get('order_id')
        order = Orders.query.filter_by(order_id=order_id).first()
        # 判断是否过期，如果过期的话，需要提醒购买
        return jsonify(data=order.to_user())

