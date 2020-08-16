from flask import Flask, redirect
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import pymysql

pymysql.install_as_MySQLdb()

db = SQLAlchemy()


def create_app():
    app = Flask(__name__, static_url_path="/../webapp/build")
    CORS(app)
    # 添加配置信息
    app.config.from_object(Config)
    db.init_app(app)
    # 添加蓝图
    from server.views import api
    app.register_blueprint(api, url_prefix='/')

    # 设置静态文件目录
    # @app.before_request
    # def check_login():
    #     return redirect("/login")
    return app


from .models import *
