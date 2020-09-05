import requests
import time
from datetime import datetime
import re

url_1 = "http://121.196.30.177/card_data?startTime=2020-08-18&endTime=2025-08-24&catalog=%E6%B7%98%E5%AE%9D%E5%BA%97&dateType=day"

url = "http://fund.eastmoney.com/720001.html"

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
}


def get_current_price():
    response = requests.get(url, headers=headers)
    regex = r"""ui-color-red">([1-9\.%]+)<\/span><span>"""
    content = response.content.decode('utf-8')
    result = re.findall(regex, content)
    if result:
        return result[0]


class Stock(object):
    BASE_URL = 'http://hq.sinajs.cn/list='

    CODE_MAP = {
        "SH": 'sh',
        "SZ": 's_sz'
    }

    def __init__(self, code, zone, cost, shares):
        self.code = code
        self.zone = zone
        self.cost = cost
        self.shares = shares
        res = requests.get(self.url)
        self.content = res.content.decode('gbk')


    @property
    def url(self):
        return self.BASE_URL + self.CODE_MAP[self.zone] + self.code

    @property
    def current_price(self):
        if self.zone == "SH":
            return float(self.content.split(',')[3])
        return float(self.content.split(',')[1])

    @property
    def net_profit(self):
        return round((self.current_price - self.cost) * self.shares, 2)

    @property
    def up_rate(self):
        return round((self.current_price - self.cost) / self.cost * 100, 2)

    @property
    def net_wealth(self):
        return round(self.current_price * self.shares, 2)

    def to_dict(self):
        return {
            "now": datetime.now().strftime("%H:%M"),
            "current_price": self.current_price,
            "net_profit": self.net_profit,
            "up_rate": self.up_rate,
            "net_wealth": self.net_wealth
        }


if __name__ == '__main__':
    while True:
        stocks = [
            {"code": "300480", "zone": "SZ", "cost": 19.732, "shares": 500},
            {"code": "603886", "zone": "SH", "cost": 21.127, "shares": 100},
        ]

        r = requests.get(
            'http://121.196.30.177/card_data?startTime=2020-08-28&endTime=2021-09-03&catalog=%E6%B7%98%E5%AE%9D%E5%BA%97&dateType=day')
        taobao = r.json()['data']['items'][-1]['amount']
        data = []
        i = 1
        total = 0
        for item in stocks:
            stock = Stock(**item)
            total += stock.net_profit
            data.append(stock.current_price)
            data.append(stock.net_profit)

        print(taobao, total, data[1], data[3])

        time.sleep(5)
