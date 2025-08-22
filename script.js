const words = [
  // Tech
  { word: "javascript", hint: "A programming language for the web" },
  { word: "developer", hint: "A person who writes code" },
  { word: "algorithm", hint: "Step-by-step instructions for solving a problem" },
  { word: "python", hint: "A popular programming language with a snake name" },
  { word: "database", hint: "Where all the data is stored" },
  { word: "compiler", hint: "It translates code into machine language" },
  { word: "internet", hint: "The network connecting the world" },

  // Science & Space
  { word: "galaxy", hint: "Huge system of stars, like the Milky Way" },
  { word: "gravity", hint: "Force that keeps us on Earth" },
  { word: "neutron", hint: "Neutral particle in an atom" },
  { word: "telescope", hint: "Used to look at stars and planets" },
  { word: "oxygen", hint: "Essential gas we breathe" },

  // Animals
  { word: "elephant", hint: "Largest land animal" },
  { word: "dolphin", hint: "Smart aquatic mammal" },
  { word: "kangaroo", hint: "Animal with a pouch from Australia" },
  { word: "panda", hint: "Black and white bamboo lover" },
  { word: "penguin", hint: "Bird that can’t fly but swims" },
  { word: "giraffe", hint: "Tallest animal with a long neck" },

  // Food
  { word: "pizza", hint: "Italian dish with cheese and toppings" },
  { word: "burger", hint: "Fast food with bun, patty and cheese" },
  { word: "pasta", hint: "Italian noodles" },
  { word: "chocolate", hint: "Sweet treat made from cocoa" },
  { word: "sandwich", hint: "Bread with fillings" },
  { word: "samosa", hint: "Fried Indian snack with potato filling" },
  { word: "biryani", hint: "Flavorful rice dish from India" },

  // Places
  { word: "paris", hint: "City of love" },
  { word: "london", hint: "Capital of England" },
  { word: "tokyo", hint: "Capital of Japan" },
  { word: "dubai", hint: "Famous for Burj Khalifa" },
  { word: "delhi", hint: "Capital of India" },
  { word: "sydney", hint: "Australian city with Opera House" },

  // Fun & Random
  { word: "hangman", hint: "This game’s name" },
  { word: "rainbow", hint: "7 colors in the sky after rain" },
  { word: "friendship", hint: "Bond between besties" },
  { word: "adventure", hint: "Exciting experience or journey" },
  { word: "vacation", hint: "Time to relax and travel" },
  { word: "football", hint: "World’s most popular sport" },
  { word: "cricket", hint: "Popular sport in India" },
  { word: "guitar", hint: "String musical instrument" }
];

let chosen = words[Math.floor(Math.random() * words.length)];
let chosenWord = chosen.word;
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

const wordDisplay = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");
const hintBtn = document.getElementById("hint-btn");
const hintDisplay = document.getElementById("hint");
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
    ctx.beginPath();
    ctx.arc(120, 55, 15, 0, Math.PI * 2); // Head
    ctx.stroke();
  } else if (wrongGuesses === 2) {
    ctx.beginPath();
    ctx.moveTo(120, 70);
    ctx.lineTo(120, 120); // Body
    ctx.stroke();
  } else if (wrongGuesses === 3) {
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(90, 100); // Left arm
    ctx.stroke();
  } else if (wrongGuesses === 4) {
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(150, 100); // Right arm
    ctx.stroke();
  } else if (wrongGuesses === 5) {
    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.lineTo(100, 150); // Left leg
    ctx.stroke();
  } else if (wrongGuesses === 6) {
    ctx.beginPath();
    ctx.moveTo(120, 120);
    ctx.lineTo(140, 150); // Right leg
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

// Hint system
hintBtn.addEventListener("click", () => {
  hintDisplay.textContent = "💡 Hint: " + chosen.hint;
  hintBtn.disabled = true;
});

// Restart button
restartBtn.addEventListener("click", () => {
  chosen = words[Math.floor(Math.random() * words.length)];
  chosenWord = chosen.word;
  guessedLetters = [];
  wrongGuesses = 0;
  message.textContent = "";
  hintDisplay.textContent = "";
  hintBtn.disabled = false;
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
