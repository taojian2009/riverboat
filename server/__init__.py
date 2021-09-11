from flask import Flask, redirect
from config import Config
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
import bfa
from server.middleware.access_log import setup_access_log
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)


@app.context_processor
def bfa_flask():
    return bfa.templatetags.bfa.fingerprint_input()


class User(object):
    is_authenticated = True


def request_loader(request):
    user = User()
    return user


def create_app():
    CORS(app)
    app.config.from_object(Config)
    from .models.base import db
    db.init_app(app)
    from server.views import api
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.request_loader(request_loader)
    from . import handler
    handler.init_app(app)
    app.register_blueprint(api, url_prefix='/')
    # 设置静态文件目录
    db.init_app(app)
    migrate = Migrate(app, db)
    setup_access_log(app)
    return app
