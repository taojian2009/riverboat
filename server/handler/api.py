# -*- coding:utf-8 -*-
from flask import make_response
from flask_restful import Api
from werkzeug.wrappers import Response
from .membership import MembershipsResource, MembershipResource

api = Api()

api.add_resource(MembershipsResource, '/api/v1/memberships')
api.add_resource(MembershipResource, '/api/v1/membership')

