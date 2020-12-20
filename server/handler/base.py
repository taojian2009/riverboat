# -*- coding:utf-8 -*-

import time

from inspect import isclass
from flask import Blueprint, current_app, request

from flask_login import current_user, login_required
from flask_restful import Resource, abort

routes = Blueprint("riverboat", __name__)


class BaseResource(Resource):
    decorators = [login_required]

    def __init__(self, *args, **kwargs):
        super(BaseResource, self).__init__(*args, **kwargs)
        self._user = None


def paginate(query_set, page, page_size, serializer, **kwargs):
    count = query_set.count()

    if page < 1:
        abort(400, message="Page must be positive integer.")

    if (page - 1) * page_size + 1 > count > 0:
        abort(400, message="Page is out of range.")

    if page_size > 250 or page_size < 1:
        abort(400, message="Page size is out of range (1-250).")

    results = query_set.paginate(page, page_size)

    # support for old function based serializers
    # if isclass(serializer):
    #     items = serializer(results.items, **kwargs).serialize()
    # else:
    print(results.items)
    items = [result.to_dict() for result in results.items]

    return {"count": count, "page": page, "page_size": page_size, "results": items}