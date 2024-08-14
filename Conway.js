const canvas = document.getElementById('canvas');
canvas.style.backgroundColor = 'black';
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';

const startButton = document.getElementById('startButton');
const gridButton = document.getElementById('grid');

let isGrid = false;

const rowLength = 30;
const colLength = 45;

const cellWidth = canvas.width / colLength;
const cellHeight = canvas.height / rowLength;

let map = Array.from({ length: rowLength }, () => Array(colLength).fill(0));
let running = false;

const HX = [-1, 1, 0, 0, -1, 1, -1, 1];
const HY = [0, 0, -1, 1, -1, 1, 1, -1];

function neighbors(map, x, y) {
    let count = 0;

    for (let i = 0; i < 8; i++) {
        const checkX = x + HX[i];
        const checkY = y + HY[i];
        if (checkX >= 0 && checkX < rowLength && checkY >= 0 && checkY < colLength) {
            count += map[checkX][checkY];
        }
    }
    return count;
}

function update(map) {
    const toOne = [];
    const toZero = [];

    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < colLength; j++) {
            const count = neighbors(map, i, j);

            if (map[i][j] === 0 && count === 3) {
                toOne.push([i, j]);
            } else if (map[i][j] === 1 && (count < 2 || count > 3)) {
                toZero.push([i, j]);
            }
        }
    }

    for (const [x, y] of toOne) {
        map[x][y] = 1;
    }

    for (const [x, y] of toZero) {
        map[x][y] = 0;
    }
}

function drawMap(map) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < colLength; j++) {
            ctx.fillStyle = map[i][j] === 1 ? 'yellow' : 'black';
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }

    if (isGrid) {
        HorizontalLines();
        VerticalLines();
    }
}

function gameLoop() {
    if (running) {
        drawMap(map);
        update(map);
        setTimeout(gameLoop, 200);
    }
}

function HorizontalLines() {
    for (let i = 0; i <= rowLength; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellHeight);
        ctx.lineTo(canvas.width, i * cellHeight);
        ctx.stroke();
    }
}

function VerticalLines() {
    for (let i = 0; i <= colLength; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(i * cellWidth, canvas.height);
        ctx.stroke();
    }
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const row = Math.floor(y / cellHeight);
    const col = Math.floor(x / cellWidth);

    map[row][col] = map[row][col] === 0 ? 1 : 0;

    drawMap(map);
});

gridButton.addEventListener('click', () => {
    isGrid = !isGrid;
    gridButton.textContent = isGrid ? "Hide #" : "Show #";
    drawMap(map);
});

startButton.addEventListener('click', () => {
    running = !running;
    startButton.textContent = running ? "Stop" : "Start";
    drawMap(map);

    if (running) gameLoop();
});
