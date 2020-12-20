# -*- coding:utf-8 -*-
from flask import make_response, request
from server.models.base import db
from server.model import Membership, Orders
from server.model import Income
from server.utils import parse_human_time

from .base import BaseResource, paginate
from flask import jsonify


class MembershipsResource(BaseResource):

    def get(self):
        items = Membership.all().all()
        data = [item.to_simple_dict() for item in items]
        return jsonify(data=data)


class MembershipResource(BaseResource):

    def post(self):
        form = dict(request.json)
        form['start_time'] = parse_human_time(form['start_time'])
        obj = Orders.create_one(form)
        return jsonify(data=obj.to_dict())
