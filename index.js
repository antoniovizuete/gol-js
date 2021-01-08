// Import stylesheets
import "./style.css";

// Write Javascript code!
const dimH = 10;
const dimV = 10;

const gridEl = document.getElementById("grid");
gridEl.style.gridTemplateColumns = `repeat(${dimH}, 7px)`;
gridEl.style.gridTemplateRow = `repeat(${dimV}, 7px)`;

let matrix = [];
for (let x = 0; x < dimH; x++) {
  matrix[x] = [];
  for (let y = 0; y < dimV; y++) {
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

/*on(10, 4);
on(10, 6);
on(11, 7);
on(12, 7);
on(13, 4);
on(13, 7);
on(14, 5);
on(14, 6);
on(14, 7);*/

for (let x = 0; x < dimH; x++) {
  for (let y = 0; y < dimV; y++) {
    const cellEl = document.createElement("div");
    cellEl.className = `cell ${matrix[y][x] ? "alive" : "dead"}`;
    cellEl.id = `cell${x * dimH + y}`;
    gridEl.appendChild(cellEl);
  }
}

let paused = true;

setInterval(function() {
  if (paused) return;

  let newMatrix = JSON.parse(JSON.stringify(matrix));

  for (let x = 0; x < dimH; x++) {
    for (let y = 0; y < dimV; y++) {
      const px = x === 0 ? dimH - 1 : x - 1;
      const py = y === 0 ? dimV - 1 : y - 1;
      const nx = x === dimH - 1 ? 0 : x + 1;
      const ny = y === dimV - 1 ? 0 : y + 1;

      const neigh =
        matrix[px][py] +
        matrix[x][py] +
        matrix[nx][py] +
        matrix[px][y] +
        matrix[nx][y] +
        matrix[px][ny] +
        matrix[x][ny] +
        matrix[nx][ny];

      if (neigh === 3) {
        newMatrix[x][y] = 1;
      } else if (neigh < 2 || neigh > 3) {
        newMatrix[x][y] = 0;
      }
    }
  }

  for (let i = 0; i < dimH * dimV; i++) {
    const cellEl = gridEl.childNodes[i];
    const x = Math.floor(i / dimH);
    const y = i % dimV;
    cellEl.className = `cell ${newMatrix[y][x] ? "alive" : "dead"}`;
  }
  matrix = JSON.parse(JSON.stringify(newMatrix));
}, 200);

document.addEventListener("keypress", function(e) {
  paused = !paused;
});
