from datetime import datetime
from sqlalchemy import (
    Boolean,
    Column,
    String,
    Float,
    DateTime,
    Integer)

from sqlalchemy.ext.declarative import declarative_base

Model = declarative_base()


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
            "create_time": self.create_time.strftime("%Y-%m-%d")
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
