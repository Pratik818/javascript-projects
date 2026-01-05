let isRunning = false
let currentTime = 0
let timeReference = 0
let startTime = 0
let timeIntervalRef = null
let timeTag = document.getElementById("timespanTag")

let btnReset = document.getElementById("reset")
let btnStart = document.getElementById("start")
let btnStop = document.getElementById("stop")



function formattime(ms){
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10); 

    
    return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}:${String(milliseconds).padStart(2,"0")}`
}


timeTag.innerHTML = formattime(0)



function start(){
    if(!isRunning){
        isRunning = true
        startTime  = Date.now() - currentTime

        timeIntervalRef = setInterval(()=>{
             currentTime  = Date.now() - startTime
             timeTag.innerHTML = formattime(currentTime)
        },10)

        btnStart.setAttribute("disabled",true)
        btnStop.removeAttribute("disabled")
    }

}
btnStart.addEventListener("click",()=>start())

function stop(){
 if(isRunning){
    isRunning = false;
    clearInterval(timeIntervalRef);

    btnStart.removeAttribute("disabled")
    btnStop.setAttribute("disabled",true)
 }

}

btnStop.addEventListener("click",()=>stop())


function reset(){
    isRunning = false
    currentTime = 0
    clearInterval(timeIntervalRef)
    timeTag.innerHTML = formattime(0)

    btnStart.removeAttribute("disabled")
    btnStop.setAttribute("disabled",true)
}

btnReset.addEventListener("click",()=>reset())


// let allBtn = document.getElementsByName("button")
// allBtn.forEach((e)=>{
//     e.addEventListener("click",(event)=>{
//         event.setAttribute("disabled",true)
        
//     })
    
// })