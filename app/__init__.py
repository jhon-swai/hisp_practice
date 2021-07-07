# This file is for flaks object creation

from config import Config
from flask import Flask

# uncomment bellow for use as an API to allow from any
# from flask_cors import CORS


app = Flask(__name__)

app.config.from_object(Config)

# uncomment this as well for use as an API
# CORS(app)
from app import routes