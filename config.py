# This file contains the application general configurations
# This file is usually ignored but for the case of this teaser interview will be shared  

import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    BASE_DIR = basedir
    SECRET_KEY = os.urandom(32)