from flask import Flask, redirect
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
import pymysql

pymysql.install_as_MySQLdb()


class User(object):
    is_authenticated = True


def request_loader(request):
    user = User()
    return user


def create_app():
    app = Flask(__name__)
    CORS(app)
    # 添加配置信息
    app.config.from_object(Config)

    # 添加蓝图
    from .models.base import db
    db.init_app(app)
    from server.views import api
    app.register_blueprint(api, url_prefix='/')
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.request_loader(request_loader)
    from . import handler
    handler.init_app(app)
    # 设置静态文件目录
    db.init_app(app)
    migrate = Migrate(app, db)
    return app
