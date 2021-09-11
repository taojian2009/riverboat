# -*- coding:utf-8 -*-
# -*- coding:utf-8 -*-
from flask import make_response, request
from server.models.base import db
from server.model import Membership, Orders, Device
from server.model import Income
from server.utils import parse_human_time
import bfa

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
        obj = Orders.create_one(form)
        # items = Orders.all().all()
        # data = [item.to_dict() for item in items]
        return jsonify(data=obj.to_dict())

    def get(self):
        order_id = request.args.get('order_id')
        device_uuid = request.args.get("uuid")
        order = Orders.query.filter_by(order_id=order_id).first()
        devices = order.devices
        device_uuids = [device.device_uuid for device in devices]
        if device_uuid in device_uuids:
            return jsonify(data=order.to_user())
        else:
            if len(device_uuids) >= 3:
                return make_response("WARNING", 401)
            device = Device(device_uuid=device_uuid)
            devices.append(device)
            db.session.commit()
            return jsonify(data=order.to_user())
