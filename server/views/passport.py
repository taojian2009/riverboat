from . import api
from flask import jsonify, render_template, request
from server.models import Asset, Income, Outcome, User
from server import db


@api.route('/login', methods=['POST'])
def login():
    formData = request.json
    print(formData)
    return "ok"
