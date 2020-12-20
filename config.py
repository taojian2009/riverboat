import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('ALIYUN_SQLALCHEMY_URI')
    SQLALCHEMY_DATABASE_URI = "mysql://root:mysql@localhost:3306/riverboat?charset=utf8"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    if not os.environ.get("APP_ENV"):
        DEBUG = True
