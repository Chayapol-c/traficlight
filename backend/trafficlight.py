from flask import Flask, request
from flask_pymongo import PyMongo
from datetime import datetime
from time import time

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://exceed_user:1q2w3e4r@158.108.182.0:2277/exceed_backend'
mongo = PyMongo(app)

myCollection = mongo.db.g17



if __name__ == "__main__":
    app.run(debug=True)