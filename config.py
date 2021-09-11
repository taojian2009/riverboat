import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('ALIYUN_SQLALCHEMY_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    if not os.environ.get("APP_ENV"):
        DEBUG = True
    LOG_ENTRYPOINTS = ["/api/v1/order"]
