# -*- coding:utf-8 -*-
import parsedatetime
from time import mktime
from datetime import datetime
import json
import copy
import hashlib


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
