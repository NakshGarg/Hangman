const words = ["javascript","developer","hangman","coding","programming","computer","internet","science"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

const wordDisplay = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw gallows
function drawBase() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(10, 190);
    ctx.lineTo(190, 190);
    ctx.moveTo(50, 190);
    ctx.lineTo(50, 20);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 40);
    ctx.stroke();
}

function drawHangman() {
    if (wrongGuesses === 1) {
        ctx.arc(120, 55, 15, 0, Math.PI * 2);
        ctx.stroke();
    } else if (wrongGuesses === 2) {
    // Body
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(120, 120);
        ctx.stroke();
    } else if (wrongGuesses === 3) {
    // Left arm
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(90, 100);
        ctx.stroke();
    } else if (wrongGuesses === 4) {
    // Right arm
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(150, 100);
        ctx.stroke();
    } else if (wrongGuesses === 5) {
    // Left leg
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(100, 150);
        ctx.stroke();
    } else if (wrongGuesses === 6) {
    // Right leg
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(140, 150);
        ctx.stroke();
    }
}

function displayWord() {
    wordDisplay.innerHTML = chosenWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function checkGameStatus() {
    if (wrongGuesses === maxWrong) {
        message.textContent = "You Lost 😢! The word was: " + chosenWord;
        disableAllKeys();
        restartBtn.style.display = "block";
    } else if (chosenWord.split("").every(letter => guessedLetters.includes(letter))) {
        message.textContent = "You Won 🎉!";
        disableAllKeys();
        restartBtn.style.display = "block";
    }
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    if (chosenWord.includes(letter)) {
        guessedLetters.push(letter);
        displayWord();
    } else {
        wrongGuesses++;
        drawHangman();
    }
    checkGameStatus();
}

function createKeyboard() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    keyboard.innerHTML = "";
    alphabet.forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.addEventListener("click", () => handleGuess(letter, btn));
        keyboard.appendChild(btn);
    });
}

function disableAllKeys() {
    document.querySelectorAll("#keyboard button").forEach(btn => (btn.disabled = true));
}

restartBtn.addEventListener("click", () => {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    message.textContent = "";
    restartBtn.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();
    createKeyboard();
    displayWord();
});

// Initialize
drawBase();
createKeyboard();
displayWord();
