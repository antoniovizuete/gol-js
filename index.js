import "./style.css";

const DIM = 50;
const ALIVE = "cell alive";
const DEAD = "cell dead";
const toCoords = ord => [ord % DIM, Math.floor(ord / DIM)];
const toIndex = ([x, y]) => y * DIM + x;
const filter = ([ax, ay], [x, y]) => ax === x && ay === y;
const existsByCoords = (a, coords) =>
  a.filter(v => v).some(v => filter(v, coords)) ? 1 : 0;
const getIndexByCoords = (a, coords) => a.findIndex(v => filter(v, coords));
const draw = a =>
  a
    .map(coords => toIndex(coords))
    .forEach(i => (gridEl.childNodes[i].className = ALIVE));

const gridEl = document.getElementById("grid");
gridEl.style.width = `${DIM * 8}px`;
gridEl.style.height = `${DIM * 8}px`;
gridEl.style.gridTemplateColumns = `repeat(${DIM}, 7px)`;
gridEl.style.gridTemplateRow = `repeat(${DIM}, 7px)`;

Array(DIM * DIM)
  .fill()
  .forEach(() => {
    const cell = document.createElement("div");
    cell.className = DEAD;
    gridEl.appendChild(cell);
  });

draw([[25, 25], [25, 24], [25, 26], [24, 26], [26, 26]]);

let paused = true;
document.addEventListener("keypress", function(e) {
  paused = !paused;
});

let state = [...gridEl.childNodes]
  .map((v, i) => ({ coords: toCoords(i), isAlive: v.className === ALIVE }))
  .filter(v => v.isAlive)
  .map(v => v.coords);

setInterval(() => {
  if (paused) return;
  let newState = JSON.parse(JSON.stringify(state));
  Array(DIM * DIM)
    .fill()
    .forEach((_, i) => {
      const [x, y] = toCoords(i);
      const px = x === 0 ? DIM - 1 : x - 1;
      const py = y === 0 ? DIM - 1 : y - 1;
      const nx = x === DIM - 1 ? 0 : x + 1;
      const ny = y === DIM - 1 ? 0 : y + 1;
      const neigh =
        existsByCoords(state, [px, py]) +
        existsByCoords(state, [x, py]) +
        existsByCoords(state, [nx, py]) +
        existsByCoords(state, [px, y]) +
        existsByCoords(state, [nx, y]) +
        existsByCoords(state, [px, ny]) +
        existsByCoords(state, [x, ny]) +
        existsByCoords(state, [nx, ny]);
      if (neigh < 2 || neigh > 3) {
        newState[getIndexByCoords(state, [x, y])] = undefined;
      } else if (neigh === 3) {
        newState.push([x, y]);
      }
    });
  newState = newState.filter(v => v);

  gridEl.childNodes.forEach(cell => (cell.className = DEAD));
  draw(newState.filter(v => v));
  state = newState;
}, 200);
