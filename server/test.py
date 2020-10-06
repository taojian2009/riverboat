# -*- coding:utf-8 -*-
"""
@file: test.py
@author: jian.tao01
@contact: jian.tao01@liulishuo.com
@time: 2020/9/8 19:15
"""

from pyhive import hive

host = "internal-hive-service-prod-api-elb-2044998117.cn-north-1.elb.amazonaws.com.cn"
port = 10000



conn = hive.Connection(
    host="172.31.5.7",
    port=10000,
    username="tian.tang01",
    password="7bbd0c07-bd0e-11ea-b382-8c8590cc29aa",
    auth='LDAP',
    configuration={})

cursor = conn.cursor()

