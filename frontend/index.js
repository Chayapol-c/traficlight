"use-strict"

const cards = document.querySelectorAll(".card")
const status = document.querySelectorAll(".status")
const timeDetails = document.querySelectorAll(".time")
const showGraphBtn = document.querySelector(".btn-graph")
const graph = document.querySelector("#chartContainer")
const times = document.querySelectorAll(".time>p")

const changeStage = (index) =>{
    cards[index].style.cssText = "background: hsl(359, 100%, 65%)"
    timeDetails[index].style.cssText = "visibility: visible;"
}
const costs = [0, 0 ,0 ,0]


const updateData = (data) =>{
    data.result.forEach(element => {
        if(!element.isAvailable){
            let index = Number(element.nameCarPark)
            changeStage(index-1);
        }
    });
}

const updateCost= (data, num) =>{
    costs[num-1]= data.result
}

const updateTime =(data, num) =>{
    times[num-1].textContent = data.result

}

const getCost = () => {
    let numberPark = [1, 2, 3, 4]
    numberPark.forEach(num => {
        fetch(`http://localhost:50000/parking/cost?nameCarPark=${num}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then(res => res.json())
            .then(data => {
                window.setInterval(updateCost(data, num), 2000 );
            }) 
            .catch(err => {
                console.log(err.message)
            })
    })
}


const getData = () =>{
    fetch(`http://localhost:50000/parking`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin": "*",
        }})
        .then(res => res.json())
        .then(data => {
            window.setInterval(updateData(data), 2000 );
            // window.setInterval(updateTime(data), 2000);
        })
        .catch(err => {
           console.log(err.message)
        })
}


const getTime = () =>{
    let numberPark = [1, 2, 3, 4]
    numberPark.forEach(num => {
        fetch(`http://localhost:50000/parking/cost?nameCarPark=${num}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then(res => res.json())
            .then(data => {
                window.setInterval(updateTime(data,num), 2000 );
            }) 
            .catch(err => {
                console.log(err.message)
            })
    })
}

const sumCost = () =>{
    let sum = 0;
    costs.forEach(ele => sum+= ele);
    return sum
}
const sumArr = []

const updateSum = (value) =>{
    sumArr.push({y: value})
    return sumArr
}



window.setInterval(function () {
    updateSum(sumCost())
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "total money vs time-interval"
        },
        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [...sumArr], 
        }]
    });
    chart.render();
    console.log(sumArr)
    },2000
)


const showGraph = () =>{
    graph.classList.toggle("hidden")
}

showGraphBtn.addEventListener("click", showGraph)
window.setInterval(getData, 2000 );
window.setInterval(getTime, 2000);
window.setInterval(getCost, 2000 );

