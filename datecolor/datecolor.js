     
    let timeTag = document.getElementById('time')
    let colorTag = document.getElementById('currentcolor')
    let setFun;
    let BgChanger;
    let stopBtn = document.getElementById('stop')
    const hex = "0123456789ABCDEF";
    

    function startTimer(){
        setFun = setInterval(()=>{
        let time = new Date().toLocaleTimeString()
        timeTag.innerHTML = time
        },1000)
    } 
    
    function setBgColor(){
        BgChanger = setInterval(()=>{
         let color = "#"
         for (let index = 0; index < 6; index++) {
            color+= hex[Math.round(Math.random()*16)]
            
         }

         document.body.style.background = color
         colorTag.innerHTML  = `Current Color : ${getComputedStyle(document.body).backgroundColor}`

         },1000)
    }
    
    stopBtn.addEventListener('click',()=>{
        if (stopBtn.innerText == "Start"){

            startTimer()
            setBgColor()
            stopBtn.innerHTML = "Stop"
            colorTag.innerHTML  = `Current Color : ${getComputedStyle(document.body).backgroundColor}`

        }
        else{
            clearInterval(setFun)
            clearInterval(BgChanger)
            stopBtn.innerHTML = "Start"
            colorTag.innerHTML  = `Current Color : ${getComputedStyle(document.body).backgroundColor}`
        }

    })
