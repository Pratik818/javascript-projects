
let datetime = document.getElementById('regid');
let message = document.getElementById('msg');
let colorToggleBtn = document.getElementById('color')
let heading = document.getElementById('heading')
let inputTaker = document.getElementById('newItem');
let btn2 = document.getElementById('additem');
let newItemInput = document.getElementById('newItem');
let isDarkMode = false;
let body = document.body






document.addEventListener("DOMContentLoaded", () => {

    let itemParent = document.getElementById('itemlist');
    itemParent.style.marginRight="4rem";

    let value = JSON.parse(localStorage.getItem("data")) || ["Enjoy CRUD and all features"]; 
    if( value.length == 0){
        value = ["Enjoy CRUD and all features"]
    }

    value.forEach((itemText) => {
        addListItem(itemParent, itemText);
    });

    countItem();

    // x.innerText = `${
        setInterval(()=>{datetime.innerText = ` ${new Date().toLocaleDateString()} -:-  ${new Date().toLocaleTimeString()}`},1000)
    // }`
    datetime.style.visibility = "hidden"

     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark') {
         toggleDarkMode();
     }
});

let btn = document.getElementById('datepreview');
btn.style.minWidth = "170px";

let show = false
btn.addEventListener('click', (e) => {
    if(!show){
        e.target.innerHTML="Hide Date and Time"
        datetime.style.visibility = "visible"
        datetime.innerText = `${new Date().toLocaleDateString()} -:- ${new Date().toLocaleTimeString()}`
        show = true
    }
    else{
        e.target.innerHTML="Show Date and Time"
        datetime.style.visibility = "hidden"
         show = false

    }

});

// let btn1 = document.getElementById('color');
// btn1.addEventListener('click', () => {
//     let v = document.getElementById('x');
//     let bgColor = v.style.backgroundColor === "black" ? "white" : "black";
//     v.style.backgroundColor = bgColor;
//     v.style.color = bgColor === "black" ? "white" : "black";

//     // let btns = document.getElementsByTagName('button','p')

//     // for (let index = 0; index < btns.length; index++) {
//     //      console.log(btns[index]);
//     //      if(btns[index].classList[0] == "delbtn"){
//     //         btns[index].classList.remove("delbtn") 
//     //         btns[index].classList.add("revdelbtn") 
//     //      }
//     //      else{
//     //         btns[index].classList.add("delbtn") 
//     //         btns[index].classList.remove("revdelbtn") 
//     //      }
         
        
//     // }

//     let delbtnElements = document.querySelectorAll("button,p")
//     delbtnElements.forEach((element)=>{
//         if(element.classList.contains('delbtn')){
//             element.classList.replace('delbtn','revdelbtn')
//         }
//         else{
//             element.classList.replace('revdelbtn','delbtn')
//         }
//     })

// });

colorToggleBtn.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        body.style.backgroundColor = "#1a1a1a";
        body.style.color = "#ffffff";
        heading.style.color = "#ffffff";
        document.querySelector('.bg-black').style.backgroundColor = "#2a2a2a";
        colorToggleBtn.textContent = "Light Mode";
        
        newItemInput.style.backgroundColor = "#333";
        newItemInput.style.color = "#fff";
        newItemInput.style.borderColor = "#555";
        
        const buttons = document.querySelectorAll('.delbtn');
        buttons.forEach(btn => {
            btn.classList.remove('delbtn');
            btn.classList.add('revdelbtn');
            btn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
        });
        
        
        localStorage.setItem('theme', 'dark');
        showMessage("Dark mode activated!");
    } else {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";
        heading.style.color = "#000000";
        document.querySelector('.bg-black').style.backgroundColor = "#f5f5f5";
        colorToggleBtn.textContent = "Dark Mode";
        
        newItemInput.style.backgroundColor = "#ffffff";
        newItemInput.style.color = "#000000";
        newItemInput.style.borderColor = "#000000";
        
        const buttons = document.querySelectorAll('.revdelbtn');
        buttons.forEach(btn => {
            btn.classList.remove('revdelbtn');
            btn.classList.add('delbtn');
            btn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        });
        
        
        localStorage.setItem('theme', 'light');
        showMessage("Light mode activated!");
    }
    
    renderItems();
}




function countItem() {
    let itemCount = document.getElementById('itemcount');
    let numofitems = document.getElementById('itemlist').getElementsByTagName('li');
    console.log(numofitems);
    itemCount.innerHTML = `Total Number of Items: ${numofitems.length}`;
    return numofitems.length;
}

newItemInput.addEventListener('keypress', (e) => {
    console.log(e);
    
    if (e.key === 'Enter') {
        btn2.click();
    }
});

function addListItem(parent, text) {
    let newDiv = document.createElement('div');
    // newDiv.style.display = "flex";
    // newDiv.style.maxWidth = "1100px"
    // newDiv.style.minWidth = "900px"
    // newDiv.style.alignItems = "center";
    // newDiv.style.justifyContent = "space-between";
    // newDiv.style.marginBottom = "8px";
    newDiv.classList.add('newDiv')

    let btnContainer = document.createElement('div');
    // btnContainer.style.display = "flex";
    // btnContainer.style.width = "190px"
    // btnContainer.style.justifyContent = "space-between";
    // btnContainer.style.marginBottom = "8px";
    btnContainer.classList.add('btnContainer')

    let newItem = document.createElement('li');
    newItem.textContent = text;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "DELETE";
    deleteBtn.classList.add('delbtn')



    deleteBtn.addEventListener('click', () => {
        parent.removeChild(newDiv);

        // let message = document.getElementById('message');
        // message.innerHTML = "Item deleted successfully.";
        // message.style.color = "green";
        // setTimeout(() => (message.innerHTML = ""), 1000);
        showMessage("Item deleted successfully.","green")

        let data = JSON.parse(localStorage.getItem("data")) || [];
        let index = data.indexOf(text);
        if (index > -1) data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));



        countItem();
    });

    let updateBtn = document.createElement('button');
    updateBtn.textContent = "UPDATE";
    updateBtn.classList.add('delbtn')
    
    let secondClick = false
    let updatedInputValue = null

    function updateValx(eVal){
        console.log(eVal);
        
        updatedInputValue=eVal.target.value
        console.log(updatedInputValue);

    }

    updateBtn.addEventListener("click",(e)=>{
        if(secondClick){
            if (newDiv.childNodes[0].value.trim().length > 0) {
                let data = JSON.parse(localStorage.getItem("data")) || [];
                let index = data.indexOf(text);
                data[index] = newDiv.childNodes[0].value
                localStorage.setItem("data",JSON.stringify(data))
                
    
                let liElement = document.createElement('li');
                
                liElement.textContent = newDiv.childNodes[0].value
                newDiv.childNodes[0].replaceWith(liElement)
                secondClick = false
                updatedInputValue = null
                showMessage("Item Updated Successfully","green")

            } else {
                showMessage("Item length should be more than 0","red")
                // let message = document.getElementById('message');
                // message.innerHTML = "Item length should be more than 0";
                // message.style.color = "red";
                // setTimeout(() => (message.innerHTML = ""), 1000);
            }
            


           
        }
        else{
            let data = JSON.parse(localStorage.getItem("data")) || [];
            let index = data.indexOf(text);
            
            console.log(data[index]); 
            console.log("li Val",newDiv.childNodes[0].innerText)
    
            let inputBox = document.createElement('input')
            inputBox.classList.add('inputClass')
            inputBox.value = newDiv.childNodes[0].innerText
    
            newDiv.childNodes[0].replaceWith(inputBox)
            inputBox.addEventListener("input",(event)=>updateValx(event))

            secondClick = true
        }

        
        
    });

    newDiv.appendChild(newItem);
    
    
    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(updateBtn);
    newDiv.appendChild(btnContainer);
    parent.appendChild(newDiv);
}


btn2.addEventListener('click', () => {
    let input = document.getElementById('newItem').value.trim();
    let parent = document.getElementById('itemlist');

    if (input.length > 0) {
        addListItem(parent, input);

        let data = JSON.parse(localStorage.getItem("data")) || [];
        data.push(input);
        localStorage.setItem("data", JSON.stringify(data));
        showMessage("Item added Successfully ")
        document.getElementById('newItem').value = "";
        countItem();
    } else {
        // let message = document.getElementById('message');
        // message.innerHTML = "Item length should be more than 0";
        // message.style.color = "red";
        // setTimeout(() => (message.innerHTML = ""), 1000);
        showMessage("Item length should be more than 0","red")
    }
});

let deleteButton = document.getElementById('deleteitem');
deleteButton.addEventListener('click', () => {
    let itemlength = countItem();

    if (itemlength > 0) {
        let itemlist = document.getElementById('itemlist');
        let value = JSON.parse(localStorage.getItem('data')) || [];
        value.pop(); 
        localStorage.setItem("data", JSON.stringify(value));
        itemlist.removeChild(itemlist.lastChild); 

        // let message = document.getElementById('message');
        // message.innerHTML = "Item deleted successfully.";
        // message.style.color = "green";
        // setTimeout(() => (message.innerHTML = ""), 1000);

        showMessage("Item deleted successfully.","green")

        countItem();
    } else {
           showMessage("No items in the list.","red")
    }
});


function showMessage(text,color) {
    console.log("called");

    message.textContent = text;
    message.style.color = color
    message.style.opacity = "1";
    
    setTimeout(() => {
        message.style.opacity = "0";
    }, 2000);
}
