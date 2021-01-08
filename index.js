import "./style.css";

const DIM = 6;
const ALIVE = "cell alive";
const DEAD = "cell dead";
const toCoords = ord => [ord % DIM, Math.floor(ord / DIM)];
const toIndex = ([x, y]) => y * DIM + x;
const byCoords = (a, [x, y]) =>
  a.some(([ax, ay]) => ax === x && ay === y) ? 1 : 0;

const gridEl = document.getElementById("grid");
gridEl.style.width = `${DIM * 8}px`;
gridEl.style.height = `${DIM * 8}px`;
gridEl.style.gridTemplateColumns = `repeat(${DIM}, 7px)`;
gridEl.style.gridTemplateRow = `repeat(${DIM}, 7px)`;

Array(DIM * DIM)
  .fill()
  .forEach(() => {
    const cell = document.createElement("div");
    cell.className = "cell dead";
    gridEl.appendChild(cell);
  });

[[5, 4], [5, 5], [5, 6]].forEach(
  coords => (gridEl.childNodes[toIndex(coords)].className = ALIVE)
);

let paused = true;
document.addEventListener("keypress", function(e) {
  paused = !paused;
});

const prevState = [...gridEl.childNodes]
  .map((v, i) => ({ coords: toCoords(i), isAlive: v.className === ALIVE }))
  .filter(v => v.isAlive)
  .map(v => v.coords);

const newState = [];
Array(DIM * DIM)
  .fill()
  .forEach((_, i) => {
    const [x, y] = toCoords(i);
    const px = x === 0 ? DIM - 1 : x - 1;
    const py = y === 0 ? DIM - 1 : y - 1;
    const nx = x === DIM - 1 ? 0 : x + 1;
    const ny = y === DIM - 1 ? 0 : y + 1;
    const neigh =
      byCoords(prevState, [px, py]) +
      byCoords(prevState, [x, py]) +
      byCoords(prevState, [nx, py]) +
      byCoords(prevState, [px, y]) +
      byCoords(prevState, [nx, y]) +
      byCoords(prevState, [px, ny]) +
      byCoords(prevState, [x, ny]) +
      byCoords(prevState, [nx, ny]);
    if (neigh >= 2 && neigh <= 3) {
    }
    console.log(x, y, neigh);
  });

console.log(prevState);

gridEl.childNodes.forEach((v, i) => {
  const [x, y] = toCoords(i);
  //console.log(i, x, y);
});
