"use-strict"

const cards = document.querySelectorAll(".card")
const status = document.querySelectorAll(".status")
const timeDetails = document.querySelectorAll(".time")
const showGraphBtn = document.querySelector(".btn-graph")
const graph = document.querySelector("#chartContainer")
const time = document.querySelectorAll(".time>p")

const changeStage = (index) =>{
    cards[index].style.cssText = "background: hsl(359, 100%, 65%)"
    timeDetails[index].style.cssText = "visibility: visible;"
}
const costs = []

const updateData = (data) =>{
    data.result.forEach(element => {
        if(!element.isAvailable){
            let index = Number(element.nameCarPark)
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
        .then(res => res.json())
        .then(data => {
            window.setInterval(updateData(data), 2000 );
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
}

showGraphBtn.addEventListener("click", showGraph)
window.setInterval(getData, 2000 );

