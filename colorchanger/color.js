






// NOT IN USE BECAUSE HTML ME HI SCRIPT KAR DIYA HAI


let colorsButton = document.querySelectorAll(".button")


colorsButton.forEach((button)=>{
    
 button.addEventListener('click',(e)=>{
    
     document.body.style.background = getComputedStyle(e.target).background
 })
})

