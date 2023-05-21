# -*- coding:utf-8 -*-
# -*- coding:utf-8 -*-
from flask import make_response, request, session
from server.models.base import db
from server.model import Membership, Orders, Device
from server.model import Income
from server.utils import parse_human_time
import bfa
import logging
from datetime import datetime

from .base import BaseResource, paginate
from flask import jsonify


class OrdersResource(BaseResource):

    def get(self):
        items = Orders.all()
        data = [item.to_dict() for item in items[:50]]
        return jsonify(data=data)


class OrderResource(BaseResource):
    def post(self):
        form = dict(request.json)
        form['start_time'] = parse_human_time(form['start_time'])
        form['buyer_email'] = 'zoe@me.com'
        form['buyer_phone'] = '15123035649'
        obj = Orders.create_one(form)
        return jsonify(data=obj.to_dict())

    def get(self):
        order_id = request.args.get('order_id')
        device_uuid = request.args.get("uuid")
        order = Orders.query.filter_by(order_id=order_id).first()

        if not order.is_activated:
            order.start_time = datetime.now()
            order.is_activated = True
            logging.info(f'order id <{order.order_id}> is not activated, set start_time as now <{order.start_time}>, and activate it.')
            db.session.commit()
        else:
            logging.info(f'order id <{order.order_id}> is activated, skip modify the start time')
        devices = order.devices
        device_uuids = [device.device_uuid for device in devices]
        if session.get("user_id"):
            username = session.get("username")
            logging.info(f"user <{username}> is logged in, skip check device")
            return jsonify(data=order.to_user())
        if device_uuid in device_uuids:
            return jsonify(data=order.to_user())
        else:
            if len(device_uuids) >= 3:
                return make_response("WARNING", 401)
            device = Device(device_uuid=device_uuid)
            devices.append(device)
            db.session.commit()
            return jsonify(data=order.to_user())
