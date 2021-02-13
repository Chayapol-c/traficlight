"use-strict"

console.log("Test")

const cards = document.querySelectorAll(".card")
const status = document.querySelectorAll(".status")
const timeDetails = document.querySelectorAll(".time")


const changeStage = (index) =>{
    cards[index].style.cssText = "background: #f36;"
    timeDetails[index].style.cssText = "visibility: visible;"
}

const car1 =    {
    "_id": "60273f32f56e3c00070ec8a9",
    "nameCarPark": "1",
    "isAvailable": false,
    "timeIn" : "2020-01-01 12:00:00"
}

const car2 = {
    "_id": "602756891fa18f0ce9edc119",
    "nameCarPark": "2",
    "isAvailable": false,
    "timeIn": "2021-02-13 12:00:21"
}

const car3 = {
    "_id": "6027569e1fa18f0ce9edc11a",
    "nameCarPark": "3",
    "isAvailable": true,
    "timeIn": "2021-02-13 11:33:34"
}

const car4 = {
    "_id": "60275abc3cb64f65dce1fcd7",
    "nameCarPark": "4",
    "isAvailable": true,
    "timeIn": "2021-02-13 11:51:08"
}


const cars = [car1, car2, car3, car4]


const updateData = (data) =>{
    data.forEach(ele => {
        if(!ele.isAvailable){
            let index = Number(ele.nameCarPark)
            changeStage(index-1);
        }
    });
}

const getData = () =>{
    fetch("https://backend.cpsk-club.xyz/g17/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}

window.setInterval(getData(), 2000 );
window.setInterval(updateData(cars), 2000 );


