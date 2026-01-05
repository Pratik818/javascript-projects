let btn1 = document.getElementById('color');
let apibtn = document.getElementById('apidata')

let malespan =  document.getElementById("male")
let femalespan = document.getElementById("female")

let male  = 0
let female = 0

let apiTimeSpan = document.getElementById("apiTime")

let body = document.getElementById('x')

btn1.addEventListener('click', () => {
    let v = document.getElementById('x');

    
    let bgColor = v.style.backgroundColor === "rgb(33, 33, 33)" ? "white" : "rgb(33, 33, 33)";
    v.style.backgroundColor = bgColor;


    v.style.color = bgColor === "rgb(33, 33, 33)" ? "white" : "rgb(33, 33, 33)";

    let btX = bgColor === "rgb(33, 33, 33)" ? "revdelbtn" : "delbtn"
    let  btX1 = bgColor === "rgb(33, 33, 33)" ? "delbtn" : "revdelbtn"

    let cards = document.getElementsByClassName('card')
    if(cards){
        console.log(cards);
        
        Array.from(cards).map((element)=>{
            if(btX == "revdelbtn"){
                element.classList.remove("bg")
                element.classList.add("revbg")
            }
            else{
                element.classList.remove("revbg")
                element.classList.add("bg")
            }
            
        })
    }

    btn1.classList.remove(btX1)
    btn1.classList.add(btX)


    apibtn.classList.remove(btX1)
    apibtn.classList.add(btX)


    malespan.classList.remove(btX1)
    malespan.classList.add(btX)

    femalespan.classList.remove(btX1)
    femalespan.classList.add(btX)

    apiTimeSpan.classList.remove(btX1)
    apiTimeSpan.classList.add(btX)



    
});




let apiTime = null;

let loading = document.getElementById("loading")

function createCard(data,parent,parent1,index){
    if (index == 11) {
        parent.style.display = "flex";
        parent1.style.display = "none"
        loading.style.visibility = "hidden"

        apiTimeSpan.innerHTML = `Api Call Time  : ${apiTime} ${apiTime.charAt(0) == "0"?" ms":" s"}`

    }

    let maindiv = document.createElement('div')
    maindiv.classList.add('card')
    let bodyDiv = document.body; 
    let bgColor = getComputedStyle(bodyDiv).background
    console.log(bgColor);
    
    maindiv.classList.add(bgColor == "rgb(33, 33, 33)"?"revbg":"bg" )
    
    
    console.log("Data",data);
    
    maindiv.innerHTML = `<div style="display:flex; justify-content:space-between;width:100%;"><img src = ${data.picture.medium} style="margin-bottom:20px;"><span>Age : ${data.dob.age}</span></div>
                        <div>
                        Name : ${data.name.title} ${data.name.first}  ${data.name.last } <br>  Gender : ${data.gender} 
                        <br> City : ${data.location.city} <br> State : ${data.location.state} <br> Country : ${data.location.country} </div>`

    parent.appendChild(maindiv)



    
    return maindiv

}


let parent = document.getElementById('apivalues')
let parent1 = document.getElementById('apivalues2') 

let createArray = []


apibtn.addEventListener('click', async ()=>{
    
    for (let index = 0; index < 12; index++) {
        let seamerCard = document.createElement('div');
        seamerCard.classList.add('scard');
        
       

        parent1.appendChild(seamerCard);

        console.log(index);
        
    };
    setTimeout( async ()=>{

            const startTime = performance.now(); 

            let data = await fetch("https://randomuser.me/api/?results=12")
            
            let jsonData = await data.json()

            const endTime = performance.now(); 

            apiTime = ((endTime - startTime)/1000).toFixed(3);

            let userArray = jsonData.results
            
            for (let index = 0; index < userArray.length; index++) {
            
                let user = userArray[index]
                
                user.gender === "female" ? female+=1:male+=1
                
            
                createCard(user,parent,parent1,index)

                malespan.innerHTML = `Male : ${male}`;
                femalespan.innerHTML = `Female : ${female}`;
                
            }


            

    },100)
    
    loading.style.visibility = "visible"
    
    
})
