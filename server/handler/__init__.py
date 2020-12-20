from flask import jsonify
from flask_login import login_required
from .api import api
from .base import routes


def init_app(app):
    app.register_blueprint(routes, url_prefix='/')
    api.init_app(app)
