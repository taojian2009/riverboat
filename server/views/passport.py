from . import api
from flask import jsonify
from flask_wtf import csrf


@api.route('/login', methods=['POST'])
def login():
    return "ok"


@api.route("/generate_code")
def generate_code():
    return jsonify(code=123124)
