# import email
# import imaplib
# import re
# import parsedatetime
# from datetime import datetime
# from dateutil.parser import parse
# from flask import Flask, jsonify, render_template, request
# from flask_script import Manager
# import logging
#
#
# def dttm_from_timtuple(d):
#     return datetime(
#         d.tm_year, d.tm_mon, d.tm_mday, d.tm_hour, d.tm_min, d.tm_sec)
#
#
# def parse_datetime(s):
#     if not s:
#         return None
#     try:
#         dttm = parse(s)
#     except Exception:
#         try:
#             cal = parsedatetime.Calendar()
#             parsed_dttm, parsed_flags = cal.parseDT(s)
#             # when time is not extracted, we 'reset to midnight'
#             if parsed_flags & 2 == 0:
#                 parsed_dttm = parsed_dttm.replace(hour=0, minute=0, second=0)
#             dttm = dttm_from_timtuple(parsed_dttm.utctimetuple())
#         except Exception as e:
#             raise ValueError("Couldn't parse date string [{}]".format(s))
#     return dttm
#
#
# app = Flask(__name__)
#
#
# @app.route("/riverboat")
# def riverboat():
#     try:
#         EMAIL = request.args.get("email")
#         PASSWORD = request.args.get("password")
#         SERVER = 'imap.gmail.com'
#         mail = imaplib.IMAP4_SSL(SERVER)
#         mail.login(EMAIL, PASSWORD)
#         mail.select('inbox')
#         status, data = mail.search(None, 'ALL')
#         mail_ids = []
#
#         for block in data:
#             mail_ids += block.split()
#         final_mail = None
#         for i in mail_ids:
#             status, data = mail.fetch(i, '(RFC822)')
#             mail_content = ''
#             for response_part in data:
#                 if isinstance(response_part, tuple):
#                     message = email.message_from_bytes(response_part[1])
#
#                     mail_from = message['from']
#                     if mail_from != "Educative <support@educative.io>":
#                         continue
#                     mail_subject = message['subject']
#                     if message.is_multipart():
#                         mail_content = ''
#                         for part in message.get_payload():
#                             if part.get_content_type() == 'text/plain':
#                                 mail_content += part.get_payload()
#                     else:
#                         mail_content = message.get_payload()
#                     final_mail = mail_content
#
#         code = re.findall("Educative: ([0-9]{6})", final_mail)
#         if code:
#             msg = code[0]
#         else:
#             msg = '0'
#         return jsonify(code=msg)
#     except Exception as e:
#         return jsonify(code='0', error=str(e))
#
#
# @app.route("/get_code")
# def get_code():
#     return "您好，系统升级，此方法获取验证码已经下线，请通过查看账号密码的链接获取验证码。如有问题，请联系旺旺客服"
#
#
# @app.route("/get_code2")
# def get_code2():
#     return "您好，系统升级，此方法获取验证码已经下线，请通过查看账号密码的链接获取验证码。如有问题，请联系旺旺客服"
#
#
# @app.route("/get_code3")
# def get_code3():
#     return "您好，系统升级，此方法获取验证码已经下线，请通过查看账号密码的链接获取验证码。如有问题，请联系旺旺客服"
#
#
# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=80)
