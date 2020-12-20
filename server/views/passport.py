from . import api



@api.route('/login', methods=['POST'])
def login():
    return "ok"
