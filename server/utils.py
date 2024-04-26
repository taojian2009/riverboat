# -*- coding:utf-8 -*-
from time import mktime
import config
import json
import copy
import hashlib
import requests
import email
import imaplib
import re
import parsedatetime
from datetime import datetime
from dateutil.parser import parse
from flask import Flask, jsonify, render_template, request

import logging

logger = logging.getLogger(__name__)


def dttm_from_timtuple(d):
    return datetime(
        d.tm_year, d.tm_mon, d.tm_mday, d.tm_hour, d.tm_min, d.tm_sec)


def parse_datetime(s):
    if not s:
        return None
    try:
        dttm = parse(s)
    except Exception:
        try:
            cal = parsedatetime.Calendar()
            parsed_dttm, parsed_flags = cal.parseDT(s)
            # when time is not extracted, we 'reset to midnight'
            if parsed_flags & 2 == 0:
                parsed_dttm = parsed_dttm.replace(hour=0, minute=0, second=0)
            dttm = dttm_from_timtuple(parsed_dttm.utctimetuple())
        except Exception as e:
            raise ValueError("Couldn't parse date string [{}]".format(s))
    return dttm


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
    EMAIL = params.get("email")
    PASSWORD = params.get("password")
    try:
        SERVER = 'imap.gmail.com'
        mail = imaplib.IMAP4_SSL(SERVER)
        mail.login(EMAIL, PASSWORD)
        mail.select('inbox')
        status, data = mail.search(None, 'ALL')
        mail_ids = []

        for block in data:
            mail_ids += block.split()
        final_mail = None
        for i in mail_ids:
            status, data = mail.fetch(i, '(RFC822)')
            mail_content = ''
            for response_part in data:
                if isinstance(response_part, tuple):
                    message = email.message_from_bytes(response_part[1])

                    mail_from = message['from']
                    if mail_from != "Educative <support@educative.io>":
                        continue
                    mail_subject = message['subject']
                    if message.is_multipart():
                        mail_content = ''
                        for part in message.get_payload():
                            if part.get_content_type() == 'text/plain':
                                mail_content += part.get_payload()
                    else:
                        mail_content = message.get_payload()
                    final_mail = mail_content

        code = re.findall("Educative: ([0-9]{6})", final_mail)
        if code:
            msg = code[0]
        else:
            msg = '0'
        return jsonify(code=msg)
    except Exception as e:
        return jsonify(code='0', error=str(e))

def generate_code():
    import pyotp
    import base64

    # Function to clean and verify the base32 key
    def clean_base32_key(raw_key):
        # Remove spaces and make uppercase
        clean_key = raw_key.replace(" ", "").upper()
        # Pad with '=' to make the length a multiple of 8
        clean_key += '=' * ((8 - len(clean_key) % 8) % 8)
        try:
            # Try to decode to verify correctness
            base64.b32decode(clean_key)
            return clean_key
        except base64.binascii.Error:
            return None

    # Your provided key (make sure to replace this with the correct key without spaces or invalid characters)
    formatted_secret = clean_base32_key(config.Config.TWO_FA_SECRET)

    if formatted_secret:
        totp = pyotp.TOTP(formatted_secret)
        print("Current OTP:", totp.now())
        return jsonify(code=totp.now())
    else:
        e = "Invalid base32 key. Please check the key format."
        return jsonify(code='0', error=str(e))




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
