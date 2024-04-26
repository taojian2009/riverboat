import os
import logging


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('ALIYUN_SQLALCHEMY_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    if not os.environ.get("APP_ENV"):
        DEBUG = True
    LOG_ENTRYPOINTS = ["/api/v1/order", "/get_code", "/click_good"]
    CSRF_COOKIE_NAME = "XSRF-TOKEN"
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SERVER_HOST = os.environ.get("SERVER_HOST")
    TWO_FA_SECRET = os.environ.get('TWO_FA_SECRET')
    BASE_DIR = os.getcwd()
    STATIC_FOLDER = os.path.join(BASE_DIR, 'webapp/build/static')
    TEMPLATES_FOLDER = os.path.join(BASE_DIR, 'webapp/build')
    LOG_FORMAT = '%(asctime)s pid:%(process)d %(levelname)s %(module)s - %(message)s'
    Log_LEVEL = logging.INFO
    SERVER = 'imap.gmail.com'
