// Import stylesheets
import "./style.css";

const DIM = 100;

const gridEl = document.getElementById("grid");
gridEl.style.width = `${DIM * 8}px`;
gridEl.style.height = `${DIM * 8}px`;
gridEl.style.gridTemplateColumns = `repeat(${DIM}, 7px)`;
gridEl.style.gridTemplateRow = `repeat(${DIM}, 7px)`;

let matrix = [];
let paused = true;
let generation = 1;
let alive = 0;

for (let x = 0; x < DIM; x++) {
  matrix[x] = [];
  for (let y = 0; y < DIM; y++) {
    matrix[x][y] = 0;
  }
}

const setVal = (m, y, x, v) => (m[y][x] = v);
const on = (y, x) => setVal(matrix, y, x, 1);

function onClick(e) {
  e = e || window.event;
  const target = e.target || e.srcElement;

  paused = true;
  document.getElementById("status").innerText = "Press any key to resume";

  const [x, y] = target.id.split("_").map(v => Number(v));
  on(y, x);
  for (let i = 0; i < DIM * DIM; i++) {
    const cellEl = gridEl.childNodes[i];
    const x = Math.floor(i / DIM);
    const y = i % DIM;
    cellEl.className = `cell ${matrix[y][x] ? "alive" : "dead"}`;
  }

  alive = matrix.reduce((a, c) => a + c.reduce((a1, v) => a1 + v), 0);
  document.getElementById("monitor").innerText = `Alive: ${alive}`;
}

for (let x = 0; x < DIM; x++) {
  for (let y = 0; y < DIM; y++) {
    const cellEl = document.createElement("div");
    cellEl.className = `cell ${matrix[y][x] ? "alive" : "dead"}`;
    cellEl.id = `${x}_${y}`;
    cellEl.onclick = onClick;
    gridEl.appendChild(cellEl);
  }
}

alive = matrix.reduce((a, c) => a + c.reduce((a1, v) => a1 + v), 0);
document.getElementById("monitor").innerText = `Alive: ${alive}`;

setInterval(function() {
  if (paused) return;

  let newMatrix = JSON.parse(JSON.stringify(matrix));

  for (let x = 0; x < DIM; x++) {
    for (let y = 0; y < DIM; y++) {
      const px = x === 0 ? DIM - 1 : x - 1;
      const py = y === 0 ? DIM - 1 : y - 1;
      const nx = x === DIM - 1 ? 0 : x + 1;
      const ny = y === DIM - 1 ? 0 : y + 1;

      const neigh =
        matrix[px][py] +
        matrix[x][py] +
        matrix[nx][py] +
        matrix[px][y] +
        matrix[nx][y] +
        matrix[px][ny] +
        matrix[x][ny] +
        matrix[nx][ny];

      if (neigh < 2 || neigh > 3) {
        newMatrix[x][y] = 0;
      } else if (neigh === 3) {
        newMatrix[x][y] = 1;
      }
    }
  }

  for (let i = 0; i < DIM * DIM; i++) {
    const cellEl = gridEl.childNodes[i];
    const x = Math.floor(i / DIM);
    const y = i % DIM;
    cellEl.className = `cell ${newMatrix[y][x] ? "alive" : "dead"}`;
  }
  matrix = JSON.parse(JSON.stringify(newMatrix));
  alive = matrix.reduce((a, c) => a + c.reduce((a1, v) => a1 + v), 0);
  document.getElementById("monitor").innerText = `Alive: ${alive}`;
}, 200);

document.addEventListener("keypress", function(e) {
  paused = !paused;
  document.getElementById("status").innerText = paused
    ? "Press any key to resume"
    : "Press any key to pause";
});

document
.getElementById("start")
.addEventListener("click", function(elses){
  paused = false
})