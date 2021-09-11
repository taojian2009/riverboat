import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('ALIYUN_SQLALCHEMY_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    if not os.environ.get("APP_ENV"):
        DEBUG = True
    LOG_ENTRYPOINTS = ["/api/v1/order"]
    CSRF_COOKIE_NAME = "XSRF-TOKEN"
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SERVER_HOST = os.environ.get("SERVER_HOST")
