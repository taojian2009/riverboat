import time
import os
import json
import logging
from datetime import datetime
from flask import request, session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.model import RequestLog
from sqlalchemy.ext.declarative import declarative_base
from user_agents import parse
from config import Config
from server import utils

Model = declarative_base()

logging = logging.getLogger(__name__)

DATETIME_FORMAT = "%Y-%m-%dT%H:%M:%S"
DATE_FORMAT = "%Y-%m-%d"
LOG_FORMAT = "%(message)s"
USER_KEY = '_user_'


def create_session():
    """
    create a db session
    @return: db session
    """
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    return sessionmaker(bind=engine)()


def start_timer():
    """
    start time count
    @return:
    """
    request.start_time = time.time()


def stop_timer(response):
    """
    record request detail
    @param response: http response
    @return: response
    """
    content_type = response.content_type.replace(" ", "")
    if "static" in request.path or content_type != "application/json":
        return response
    endpoint = request.path
    if endpoint not in Config.LOG_ENTRYPOINTS:
        return response
    method = request.method
    username = request.remote_addr
    endpoint = request.path
    http_status = response.status_code
    start = request.start_time
    end = time.time()
    duration_ms = round((end - start) * 1000, 2)
    start_time = datetime.fromtimestamp(start).strftime(DATETIME_FORMAT)
    end_time = datetime.fromtimestamp(start).strftime(DATETIME_FORMAT)
    remote_addr = request.remote_addr
    url = request.url
    d = request.form.to_dict() or {}
    # request parameters can overwrite post body
    request_params = request.args.to_dict()
    json_data = {} if request.json is None else dict(request.json)
    d.update(request_params)
    d.update(json_data)
    params = ''
    try:
        params = json.dumps(d, ensure_ascii=False)
    except Exception:
        pass
    user_agent = parse(request.user_agent.string)
    browser = user_agent.browser.family
    system = user_agent.os.family
    brand = user_agent.device.brand
    is_mobile = user_agent.is_mobile
    content_type = response.content_type.replace(" ", "")
    device_uuid = "" if "uuid" not in d else d['uuid']
    extra = utils.parse_location(remote_addr)

    request_log = RequestLog(method=method,
                             url=url,
                             params=params,
                             endpoint=endpoint,
                             content_type=content_type,
                             duration_ms=duration_ms,
                             http_status=http_status,
                             username=username,
                             remote_addr=remote_addr,
                             browser=browser,
                             system=system,
                             brand=brand,
                             device_uuid=device_uuid,
                             is_mobile=is_mobile,
                             start_time=start_time,
                             end_time=end_time,
                             **extra
                             )
    try:
        ses = create_session()
        ses.add(request_log)
        ses.commit()
    except Exception as e:
        logging.error("fail to save request log to db %s" % str(e))
    return response


def setup_access_log(app):
    """
    set up access log recording
    @param app: flask app
    @return:
    """
    # record start time of each request
    app.before_request(start_timer)
    # record request detail
    app.after_request(stop_timer)
