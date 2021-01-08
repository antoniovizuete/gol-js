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

function onClick(e) {
  const displayEl = document.getElementById("display");
  displayEl.innerText = JSON.stringify(e, null, 2);
}

for (let x = 0; x < DIM; x++) {
  matrix[x] = [];
  for (let y = 0; y < DIM; y++) {
    matrix[x][y] = 0;
  }
}

const setVal = (m, y, x, v) => (m[y][x] = v);
const on = (y, x) => setVal(matrix, y, x, 1);

on(3, 5);
on(4, 6);
on(5, 4);
on(5, 5);
on(5, 6);

for (let x = 0; x < DIM; x++) {
  for (let y = 0; y < DIM; y++) {
    const cellEl = document.createElement("div");
    cellEl.className = `cell ${matrix[y][x] ? "alive" : "dead"}`;
    cellEl.id = `${x}_${y}`;
    cellEl.onclick = onClick;
    gridEl.appendChild(cellEl);
  }
}

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
}, 200);

document.addEventListener("keypress", function(e) {
  paused = !paused;
});
