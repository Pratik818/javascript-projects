let generatedNumber = Math.floor(Math.random() * 100) + 1;
let btn = document.getElementById("guessbtn");
let msg = document.getElementById("guesMsg");
let form = document.getElementById("guesform");
let inputElement = document.querySelector("input");


let count = 10;

btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(generatedNumber);

    let input = parseInt(inputElement.value);

    if (isNaN(input)) {
        msg.innerHTML = "❌ Please enter a valid number!";
        inputElement.value = "";
        return;
    } else if (input > 100 || input < 1) {
        msg.innerHTML = "⚠️ Please enter a number between 1 and 100.";
        inputElement.value = "";
        return;
    }

    count--;

    if (input === generatedNumber) {
        msg.innerHTML = `🎉 You guessed it right! 🎉`;
        inputElement.disabled = true;
        btn.disabled = true;

        createPlayAgainButton();
    } else {
        if (count === 0) {
            msg.innerHTML = `❌ You've used all your attempts! The correct number was ${generatedNumber}.`;

            btn.disabled = true;
            inputElement.disabled = true;

            createPlayAgainButton();
        } else {
            if (count === 1) {
                let start = Math.max(1, generatedNumber - 5);
                let end = Math.min(100, generatedNumber + 5);
                msg.innerHTML = `🔍 Last chance! Hint: The number is between <b>${start}</b> and <b>${end}</b>.`;
            } else {
                msg.innerHTML = `❌ Wrong guess! ${count} attempts left. Try again.`;
            }
        }
    }

    inputElement.value = "";
    inputElement.focus();
});

function createPlayAgainButton() {
    let newGame = document.createElement("button");
    newGame.textContent = "Play Again";
    newGame.style.display = "block";
    newGame.style.marginTop = "10px";
    newGame.style.margin = "10px auto";

    removeExistingButtons();

    msg.innerHTML += ` Would you like to play again? `;
    msg.appendChild(newGame);

    newGame.addEventListener("click", resetGame);
}

function resetGame() {
    count = 10;
    btn.disabled = false;
    inputElement.disabled = false;
    generatedNumber = Math.floor(Math.random() * 100) + 1;
    console.log(generatedNumber);
    
    msg.innerHTML = "";
    inputElement.value = "";
    inputElement.focus();
}

function removeExistingButtons() {
    let buttons = msg.querySelectorAll("button");
    buttons.forEach((button) => button.remove());
}
