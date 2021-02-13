"use-strict"

const cards = document.querySelectorAll(".card")
const status = document.querySelectorAll(".status")
const timeDetails = document.querySelectorAll(".time")
const showGraphBtn = document.querySelector(".btn-graph")
const graph = document.querySelector("#chartContainer")



const changeStage = (index) =>{
    cards[index].style.cssText = "background: hsl(359, 100%, 65%)"
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
const costs = []

const updateData = (data) =>{
    data.forEach(ele => {
        if(!ele.isAvailable){
            let index = Number(ele.nameCarPark)
            changeStage(index-1);
        }
    });
}

const getData = () =>{
    fetch("http://localhost:50000/parking", {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin": "*",
        }})
        .then(res => {res.json()
        console.log(res)})
        .then(data => {
            console.log(data)
        })
        .catch(err => {
           console.log(err.message)
        })
}


window.onload = function () {
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "total money vs time-interval"
        },
        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [
                { y: 450 },
                { y: 414},
                { y: 520},
                { y: 460 },
                { y: 450 },
                { y: 500 },
                { y: 480 },
                { y: 480 },
                { y: 410},
                { y: 500 },
                { y: 480 },
                { y: 510 }
            ]
        }]
    });
    chart.render();
    }


const showGraph = () =>{
    graph.classList.toggle("hidden")
    console.log(graph)

}

showGraphBtn.addEventListener("click", showGraph)
window.setInterval(getData, 2000 );
window.setInterval(updateData(cars), 2000 );
