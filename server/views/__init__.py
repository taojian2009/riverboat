from flask import Blueprint

api = Blueprint('api', __name__, static_folder='')

# 需要把再次拆分出去的文件,导入到创建蓝图对象的地方
from . import core