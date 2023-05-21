from datetime import datetime, timedelta
from server.models.base import db
import time
from sqlalchemy import (
    Boolean,
    Column,
    String,
    Float,
    ForeignKey,
    DateTime,
    Text,
    Integer)
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import ChoiceType
import sqlalchemy_utils
from werkzeug.security import generate_password_hash, check_password_hash
from server import utils

# Model = declarative_base()
Model = db.Model


class BaseModel(object):
    create_time = Column(DateTime, default=datetime.now, nullable=True, comment="创建时间")
    update_time = Column(
        DateTime, default=datetime.now,
        onupdate=datetime.now, nullable=True, comment="更新时间")


class User(BaseModel, db.Model):
    """用户"""
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)  # 用户编号
    username = db.Column(db.String(32), unique=True, nullable=False)  # 用户暱称
    first_name = Column(String(20), comment="first_name")
    last_name = Column(String(20), comment="last_name")
    is_active = Column(Boolean, default=False)
    email = Column(String(20), comment="email")
    password_hash = db.Column(db.String(128), nullable=False)  # 加密的密码
    mobile = db.Column(db.String(11), unique=True, nullable=False)  # 手机号
    real_name = db.Column(db.String(32))  # 真实姓名
    avatar_url = db.Column(db.String(128))  # 用户头像路径

    # 加上property装饰器后，会把函数变为属性，属性名即为函数名
    @property
    def password(self):
        """读取属性的函数行为"""
        # print(user.password)  # 读取属性时被调用
        # 函数的返回值会作为属性值
        # return "xxxx"
        raise AttributeError("这个属性只能设置，不能读取")

    # 使用这个装饰器, 对应设置属性操作
    @password.setter
    def password(self, value):
        """
        设置属性  user.passord = "xxxxx"
        :param value: 设置属性时的数据 value就是"xxxxx", 原始的明文密码
        :return:
        """
        self.password_hash = generate_password_hash(value)

    # def generate_password_hash(self, origin_password):
    #     """对密码进行加密"""
    #     self.password_hash = generate_password_hash(origin_password)

    def check_password(self, passwd):
        """
        检验密码的正确性
        :param passwd:  用户登录时填写的原始密码
        :return: 如果正确，返回True， 否则返回False
        """
        return check_password_hash(self.password_hash, passwd)

    def to_dict(self):
        """将对象转换为字典数据"""
        user_dict = {
            "user_id": self.id,
            "name": self.username,
            "mobile": self.mobile,
            "create_time": self.create_time.strftime("%Y-%m-%d %H:%M:%S")
        }
        return user_dict

    def auth_to_dict(self):
        """将实名信息转换为字典数据"""
        auth_dict = {
            "user_id": self.id,
            "real_name": self.real_name,
        }
        return auth_dict


class Income(Model, BaseModel):
    __tablename__ = "income"
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    amount = Column(Float, comment="金额", default=0)
    name = Column(String(50), comment="收入名称", default="")
    catalog = Column(String(50), comment="收入分类", default="")
    is_passive = Column(Boolean, default=False, comment="是否为被动收入")

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "name": self.name,
            "catalog": self.catalog,
            "create_time": self.create_time.strftime("%m-%d %H:%M:%S")
        }


class Outcome(Model, BaseModel):
    __tablename__ = "outcome"
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    amount = Column(Float, comment="金额", default=0)
    name = Column(String(50), comment="支出名称", default="")
    catalog = Column(String(50), comment="支出分类", default="")


class Asset(Model, BaseModel):
    __tablename__ = "asset"
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    amount = Column(Float, comment="金额", default=0)
    name = Column(String(50), comment="资产名称", default="")
    catalog = Column(String(50), comment="资产分类", default="")


class Debt(Model):
    __tablename__ = "debt"
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    amount = Column(Float, comment="金额", default=0)
    name = Column(String(50), comment="负债名称", default="")
    catalog = Column(String(50), comment="负债分类", default="")


class Membership(Model, BaseModel):
    __tablename__ = "membership"
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    name = Column(String(50), comment="会员名称")
    account = Column(String(50), comment="账号")
    password = Column(String(50), comment="密码")
    pwd = Column(String(50), comment="邮箱密码")
    membership_type = Column(Integer, comment="会员类型")
    website = Column(String(50), comment="网站")
    user_desc = Column(Text, comment="使用说明")
    orders = relationship("Orders")
    fields = ['id', 'name', 'account', 'password', 'member_type', 'website', 'user_desc']

    @classmethod
    def all(cls):
        return cls.query.order_by(cls.id.desc())

    @property
    def member_type(self):
        membership_dict = {0: "出租", 1: "充值"}
        return membership_dict[self.membership_type]

    def to_simple_dict(self):
        return {"label": self.name, "value": self.id}

    def to_dict(self):
        d = {field: getattr(self, field) for field in self.fields}
        return d

    def to_order_dict(self):
        d = self.to_dict()
        if self.orders:
            orders = [o.to_dict() for o in self.orders]
            d.update({"orders": orders})
        return d

    def email_config(self):
        return {
            "email": self.account,
            "password": self.pwd
        }

    def to_user(self):
        fields = ['name', "account", 'password', 'website', 'user_desc']
        return {field: getattr(self, field) for field in fields}


class Orders(Model, BaseModel):
    __tablename__ = "orders"
    fields = ['id',
              'buyer_email',
              'buyer_phone',
              'duration',
              'start_date',
              'expire_date',
              'order_id',
              'membership_id',
              'is_valid',
              'membership_name',
              'valid_days']
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    buyer_email = Column(String(50), comment="用户电话")
    buyer_phone = Column(String(50), comment="会员名称")
    start_time = Column(DateTime, default=datetime.now, nullable=True, comment="会员开始时间")
    duration = Column(Integer, default=0, nullable=True, comment="会员时长|天")
    membership_id = Column(Integer, ForeignKey('membership.id'))
    membership = relationship("Membership", foreign_keys=[membership_id])
    order_id = Column(String(50), comment="订单ID")
    devices = relationship("Device")
    is_activated = Column(Boolean, default=True)

    @property
    def start_date(self):
        return datetime.strftime(self.start_time, '%Y-%m-%d %H:%M:%S')

    @property
    def membership_name(self):
        return self.membership.name

    @property
    def membership(self):
        return Membership.query.filter_by(id=self.membership_id).first()

    def to_dict(self):
        d = {field: getattr(self, field) for field in self.fields}
        return d

    @classmethod
    def all(cls):
        return cls.query.order_by(cls.id.desc())

    @property
    def is_valid(self):
        now = datetime.now()
        duration = timedelta(days=self.duration) - (now - self.start_time)
        total_seconds = duration.total_seconds()
        return total_seconds > 0

    @property
    def valid_days(self):
        now = datetime.now()
        duration = timedelta(days=self.duration) - (now - self.start_time)
        total_seconds = duration.total_seconds()
        days, remainder = divmod(total_seconds, 86400)  # 86400 seconds in a day
        hours, remainder = divmod(remainder, 3600)  # 3600 seconds in an hour
        minutes, seconds = divmod(remainder, 60)
        days = f'{int(days)}天{int(hours)}小时{int(minutes)}分{int(seconds)}秒'
        return days

    @classmethod
    def create_one(cls, form):
        obj = cls(**form)
        obj.is_activated = True
        obj.make_order_id()
        db.session.add(obj)
        db.session.commit()
        return obj

    def make_order_id(self):
        params = {
            "buyer_email": self.buyer_email,
            "membership_id": self.membership_id,
            "duration": self.duration,
            "timestamp": time.time()
        }
        self.order_id = utils.generate_key(params)

    def to_user(self):
        d = self.to_dict()
        if self.is_valid:
            d.update(self.membership.to_user())
        return d

    @property
    def expire_date(self):
        expire = self.start_time + timedelta(days=self.duration)
        return datetime.strftime(expire, "%Y-%m-%d %H:%M:%S")


class Device(Model, BaseModel):
    __tablename__ = "device"
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    order_id = Column(Integer, ForeignKey("orders.id"))
    order = relationship("Orders",
                         foreign_keys=[order_id],
                         backref=backref("order_devices", cascade="all, delete-orphan")
                         )
    device_uuid = Column(String(50))


class RequestLog(Model):
    """
    request log model
    """
    __tablename__ = "request_log"
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    method = Column(String(50))
    params = Column(Text)
    url = Column(String(1024))
    endpoint = Column(String(255))
    content_type = Column(String(50))
    duration_ms = Column(Integer)
    http_status = Column(Integer)
    username = Column(String(30))
    remote_addr = Column(String(50))
    browser = Column(String(50))
    system = Column(String(50))
    brand = Column(String(50))
    is_mobile = Column(Boolean)
    device_uuid = Column(String(50))
    country_code = Column(String(10))
    country_name = Column(String(25))
    city = Column(String(25))
    latitude = Column(Float)
    longitude = Column(Float)
    start_time = Column(DateTime, default=datetime.now, nullable=False)
    end_time = Column(DateTime, default=datetime.now, nullable=False)
    create_time = Column(DateTime, default=datetime.now, nullable=False)
    update_time = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
