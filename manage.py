from server import create_app
from flask import render_template
from flask_script import Manager

app = create_app()

app.debug = True

manager = Manager(app)

if __name__ == '__main__':
    app.run()
