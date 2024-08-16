const canvas = document.getElementById('canvas');
canvas.style.backgroundColor = 'black';
canvas.width = window.innerWidth * 0.6;
canvas.height = window.innerHeight * 0.7;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';

const startButton = document.getElementById('startButton');
const gridButton = document.getElementById('grid');
const randomButton = document.getElementById('random');
const clearButton = document.getElementById('Clear');
const generationDisplay = document.getElementById('generationDisplay');
const myRange = document.getElementById("myRange");

let speed = 200;
let isGrid = false;
let color = { red: 255, green: 255, blue: 0 };
const colorChangeSpeed = 15;

const rowLength = 30;
const colLength = 45;

let cellWidth = canvas.width / colLength;
let cellHeight = canvas.height / rowLength;

let map = Array.from({ length: rowLength }, () => Array(colLength).fill(0));
let running = false;
let generation = 0;

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
            ctx.fillStyle = map[i][j] === 1 ? `rgb(${color.red}, ${color.green}, ${color.blue})` : 'rgb(0, 0, 0)';
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }

    if (isGrid) {
        HorizontalLines();
        VerticalLines();
    }

    generationDisplay.textContent = `Generation: ${generation}`;
}

function gameLoop() {
    if (running) {
        drawMap(map);
        update(map);

        updateColor();
        generation++;
        setTimeout(gameLoop, speed);
    }
}

function updateColor() {
    if (color.red > 0 && color.blue === 0) {
        color.red = Math.max(0, color.red - colorChangeSpeed);
        color.green = Math.min(255, color.green + colorChangeSpeed);
    } else if (color.green > 0 && color.red === 0) {
        color.green = Math.max(0, color.green - colorChangeSpeed);
        color.blue = Math.min(255, color.blue + colorChangeSpeed);
    } else if (color.blue > 0 && color.green === 0) {
        color.blue = Math.max(0, color.blue - colorChangeSpeed);
        color.red = Math.min(255, color.red + colorChangeSpeed);
    }

    if (color.red === 0 && color.green === 0 && color.blue === 0) {
        color.red = 255;
        color.green = 255;
        color.blue = 0;
    }
    randomButton.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
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
    startButton.style.backgroundColor = running ? 'orange' : 'green';
    drawMap(map);

    if (running) gameLoop();
    else drawMap(map);
});

randomButton.addEventListener('click', () => {
    for (let i = 0; i < 16; i++) {
        let randomRow = Math.floor(Math.random() * rowLength);
        let randomCol = Math.floor(Math.random() * colLength);
        map[randomRow][randomCol] = 1;
    }
    drawMap(map);
});

clearButton.addEventListener('click', () => {
    map = Array.from({ length: rowLength }, () => Array(colLength).fill(0));
    drawMap(map);
    if (running)
        startButton.click();
    generation = 0;
    generationDisplay.textContent = `Generation: ${generation}`;
});

myRange.addEventListener("input", function () {
    const rangeValue = this.value;
    speed = 1000 - (rangeValue * 10);
    if (running) {
        clearTimeout(gameLoopTimeout);
        gameLoopTimeout = setTimeout(gameLoop, speed);
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.6;
    canvas.height = window.innerHeight * 0.8;
    cellWidth = canvas.width / colLength;
    cellHeight = canvas.height / rowLength;
    drawMap(map);
});

let gameLoopTimeout;
