let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");
let imageDiv = document.getElementById("imageContainer");
let count = 0
let autoBtn = document.getElementById('autoslide')

const images = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
];

images.forEach((src, index) => {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add("crausal_image");
    if (index === 0) img.classList.add("active"); 
    imageDiv.appendChild(img);
});


function updateCrausalImage(direction){
   let allCurrentCrausalImages = document.querySelectorAll(".crausal_image")
   allCurrentCrausalImages[count].classList.remove('active')

   count = (count+direction+images.length ) % images.length
   allCurrentCrausalImages[count].classList.add('active')

}

nextBtn.addEventListener("click",()=>updateCrausalImage(1))
previousBtn.addEventListener("click",()=>updateCrausalImage(-1))

let slideAuto  = false
let slideInterval = null;

autoBtn.addEventListener("click",(e)=>{
    if(!slideAuto){
        e.target.innerHTML = "AutoSlide ON"
        slideAuto = true
        slideInterval = setInterval(()=>{
        nextBtn.click()
          
        },2000)

    }
    else{
        e.target.innerHTML = "AutoSlide OFF"
        clearInterval(slideInterval);
        slideAuto = false
    }
})

// let bgBtn = document.getElementById("bg")

// bgBtn.addEventListener("click",(e)=>{
//     console.log("pepe");
    
//     let currentBg  = getComputedStyle(document.body).backgroundColor
//     console.log(currentBg);
    
//     if(currentBg ===  "rgb(33, 33, 33)"){
//         console.log("pepe inside");
        
//         Array.from(document.getElementsByTagName('button')).forEach((element)=>{
            
//             element.classList.add("bgbutton")
//             element.classList.remove("button")
//             document.body.style.backgroundColor = "white"


//         })

//     }
//     else{
//         console.log("outside");
        
//         Array.from(document.getElementsByTagName('button')).forEach((element)=>{
//             element.classList.add("button")
//             element.classList.remove("bgbutton")
//             document.body.style.backgroundColor = "rgb(33, 33, 33)"

//         })

//     }
// })
