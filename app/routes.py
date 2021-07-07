from app import app
from flask import render_template, request,redirect,flash, Response, jsonify


# The application route 
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/show_tables')
def show_tables():
    return render_template('show_tables.html')