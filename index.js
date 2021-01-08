// Import stylesheets
import "./style.css";

// Write Javascript code!
const dimH = 100;
const dimV = 100;
const dimT = dimH * dimV;

const gridEl = document.getElementById("grid");
gridEl.style.gridTemplateColumns = `repeat(${dimH}, 7px)`;
gridEl.style.gridTemplateRow = `repeat(${dimV}, 7px)`;

Array(dimT).forEach((v, i) => {
  const cell = document.createElement("div");
  cell.className = "cell dead";
  gridEl.appendChild(cell);
});

let paused = true;

document.addEventListener("keypress", function(e) {
  paused = !paused;
});
