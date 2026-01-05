let decrease = document.getElementById("dec");
let increase = document.getElementById("inc");
let reset = document.getElementById("res");
let data = document.getElementById("data");
let msg = document.getElementById("msg");
let stepInput = document.getElementById("step");
let rangeValue = document.getElementById("range-value");
let darkModeToggle = document.getElementById("darkModeToggle");
let maxStep = document.getElementById("max-step")

maxStep.addEventListener("change",(e)=>{
    console.log(stepInput.attributes[3].value);
    let currentMax  = stepInput.attributes[3].value
    currentMax = parseInt(currentMax) + parseInt(e.target.value)
    stepInput.attributes[3].value = currentMax
    
})

data.innerText = localStorage.getItem("counter") || "0";

stepInput.addEventListener("input", () => {
    rangeValue.innerText = stepInput.value;
});

decrease.addEventListener("click", () => {
    let val = Number(data.textContent);
    let step = Number(stepInput.value);

    if (val - step < 0) {
        msg.innerText = "⚠️ Can't reduce below zero!";
        msg.style.color = "red";
        setTimeout(() => msg.innerText = "", 1500);
    } else {
        data.innerText = val - step;
        saveCounter();
    }
});

increase.addEventListener("click", () => {
    let val = Number(data.textContent);
    let step = Number(stepInput.value);
    data.innerText = val + step;
    saveCounter();
});

reset.addEventListener("click", () => {
    data.innerText = "0";
    msg.innerText = "";
    stepInput.attributes[3].value = 10
    saveCounter();
});

function saveCounter() {
    localStorage.setItem("counter", data.innerText);
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") increase.click();
    if (e.key === "ArrowDown") decrease.click();
    if (e.key === "r") reset.click();
});
