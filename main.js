const numSquares = { easy: 3, hard: 6 };
let currentMode = "easy";
let pickedColor;
let colors = [];

const squaresContainer = document.getElementById("squareContainer");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  easyBtn.addEventListener("click", () => {
    currentMode = "easy";
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    reset();
  });

  hardBtn.addEventListener("click", () => {
    currentMode = "hard";
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    reset();
  });
}

function setupSquares() {
  for (let i = 0; i < numSquares.hard; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    squaresContainer.appendChild(square);
    square.addEventListener("click", handleSquareClick);
  }
}

function handleSquareClick() {
  const clickedColor = this.style.backgroundColor;
  if (clickedColor === pickedColor) {
    message.textContent = "Correct!";
    changeColors(pickedColor);
    resetButton.textContent = "Play Again?";
  } else {
    this.style.backgroundColor = "#232323";
    message.textContent = "Try Again!";
  }
}

function reset() {
  colors = generateRandomColors(numSquares[currentMode]);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  message.textContent = "";
  resetButton.textContent = "New Colors";

  const squares = document.querySelectorAll(".square");
  squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i];
    } else {
      square.style.display = "none";
    }
  });
}

resetButton.addEventListener("click", reset);

function changeColors(color) {
  document.querySelectorAll(".square").forEach((square) => {
    square.style.backgroundColor = color;
    square.style.transform = "scale(1.05)";
  });
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 216);
  const g = Math.floor(Math.random() * 226);
  const b = Math.floor(Math.random() * 206);
  return `rgb(${r}, ${g}, ${b})`;
}
