# -*- coding:utf-8 -*-
import parsedatetime
from time import mktime
from datetime import datetime
import json
import copy
import hashlib
import requests


def request_loader(request):
    user = "taojian"
    return user


def generate_key(dict_data, daily=True):
    """generate key from a dictionary"""
    cache_dict = copy.copy(dict_data)
    json_data = json.dumps(cache_dict)
    return hashlib.md5(json_data.encode('utf-8')).hexdigest()


cal = parsedatetime.Calendar()


def parse_human_time(s):
    time_struct, _ = cal.parse(s)
    return datetime.fromtimestamp(mktime(time_struct))


def fetch_code(order, host):
    membership = order.membership
    params = membership.email_config()
    res = requests.get(host, params=params)
    return res.json()


def parse_location(ip):
    data = {}
    """
        country_code = Column(String(10))
    country_name = Column(String(10))
    city = Column(String(10))
    latitude = Column(Float)
    longitude = Column(Float)"""
    keys = ["country_code", "country_name", "city", "latitude", "longitude"]
    try:
        url = f"https://geolocation-db.com/json/{ip}&position=true"
        res = requests.get(url)
        payload = res.json()
        for key in keys:
            data[key] = payload[key]
    except:
        pass
    finally:
        return data
