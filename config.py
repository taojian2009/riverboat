import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('ALIYUN_SQLALCHEMY_URI')

    if not os.environ.get("APP_ENV"):
        DEBUG = True
