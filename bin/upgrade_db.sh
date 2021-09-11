
cd $PWD
source prod.env

export FLASK_APP=manage.py

flask db upgrade