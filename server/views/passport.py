import json
from . import api
from flask import jsonify, request, abort, session
from server.models.base import db
from server.model import User
from flask_login import login_user


@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    user = db.session.query(User).filter_by(username=username).first()
    if not user:
        abort(404)
    if not user.check_password(password):
        abort(403)
    login_user(user)
    session["user_id"] = user.id
    return json.dumps(user.to_dict())
