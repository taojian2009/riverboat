import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('ALIYUN_SQLALCHEMY_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = True
