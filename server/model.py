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
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import ChoiceType
import sqlalchemy_utils
from server import utils

# Model = declarative_base()
Model = db.Model


class BaseModel(object):
    create_time = Column(DateTime, default=datetime.now, nullable=True, comment="创建时间")
    update_time = Column(
        DateTime, default=datetime.now,
        onupdate=datetime.now, nullable=True, comment="更新时间")


class User(Model, BaseModel):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True, comment="id主键")
    username = Column(String(20), comment="username")
    first_name = Column(String(20), comment="first_name")
    last_name = Column(String(20), comment="last_name")
    email = Column(String(20), comment="email")


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
    order_id = Column(String(50), comment="订单ID")

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
        return self.valid_days > 0

    @property
    def valid_days(self):
        now = datetime.now()
        duration = timedelta(days=self.duration) - (now - self.start_time)
        return duration.days

    @classmethod
    def create_one(cls, form):
        obj = cls(**form)
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
