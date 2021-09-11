import pandas as pd

from server.utils import parse_location

from config import Config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.model import RequestLog


def get_engine():
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    return engine


def get_session():
    engine = get_engine()
    session = sessionmaker(bind=engine)()
    return session


if __name__ == '__main__':
    engine = get_engine()
    sql = "select distinct remote_addr from request_log"
    df = pd.read_sql_query(sql, engine)
    import time
    for ip in df.remote_addr.values.tolist():
        extra = parse_location(ip)
        data = []
        for k,v in extra.items():
            if isinstance(v, str):
                data.append(f' {k}="{v}" ')
            if isinstance(v, float):
                data.append(f' {k}={v} ')
        snippet = ",".join(data)
        sql = f"""update request_log set {snippet} where remote_addr="{ip}";"""
        engine.execute(sql)
        print(sql)
        time.sleep(2)
