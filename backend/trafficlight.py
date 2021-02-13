from flask import Flask, request
from flask_pymongo import PyMongo
from datetime import datetime
from time import time

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://exceed_user:1q2w3e4r@158.108.182.0:2277/exceed_backend'
mongo = PyMongo(app)

myCollection = mongo.db.g17

def currentTime():
    fmt = '%Y-%m-%d %H:%M:%S'
    ts = time()
    currentTime = str(datetime.fromtimestamp(ts).strftime(fmt))
    return currentTime

def parkingTime():
    data = request.json
    timeIn = data["timeIn"]


    fmt = '%Y-%m-%d %H:%M:%S'
    tstamp1 = datetime.strptime(timeIn, fmt)
    tstamp2 = datetime.strptime(currentTime, fmt)

    parkingTime_sec = tstamp2 - tstamp1
    parkingTime_min = int(round(parkingTime_sec.total_seconds() / 60))

    return parkingTime_min

@app.route('/parking', methods=['POST'])
def new_parking():
    data = request.json
    insert = ({
        "nameCarPark": data["nameCarPark"],
        "isAvailable": True,
        "timeIn" : currentTime()
    })
    myCollection.insert_one(insert)
    return {"result": "add successful"}

@app.route('/parking', methods = ['PATCH'])
def update_parking_true():
    data = request.json
    filt = {"nameCarPark": data["nameCarPark"]}
    update = {"$set":{
        "isAvailable": True,
        "timeIn" : currentTime()
    }}
    myCollection.update_one(filt, update)

    return {"result": "update successful"}

@app.route('/parking', methods = ['GET'])
def show():
    para = request.args
    data = myCollection.find(para)
    output = []

    for data in data:
        output.append({
            "nameCarPark": data["nameCarPark"],
            "isAvailable": data["isAvailable"],
            "timeIn" : data["timeIn"]
        })
    
    return { "result": output }
    
if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = '50000', debug = True)