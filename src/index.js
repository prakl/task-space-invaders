import {
    preload,
    init,
    update,
    draw, gameState
} from './game'

const canvas = document.getElementById("cnvs");
const restart = document.getElementById('restart');
let leaderboard = document.getElementById("leaderboard")
restart.addEventListener('click',onPreloadComplete,false);

canvas.width = 600;
canvas.height = window.innerHeight;

const tickLength = 15; //ms
let lastTick;
let lastRender;
let stopCycle;

function run(tFrame) {
    stopCycle = window.requestAnimationFrame(run);

    const nextTick = lastTick + tickLength;
    let numTicks = 0;

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - lastTick;
        numTicks = Math.floor(timeSinceTick / tickLength);
    }

    for (let i = 0; i < numTicks; i++) {
        lastTick = lastTick + tickLength;
        update(lastTick, stopGame);
    }

    draw(canvas, tFrame);
    lastRender = tFrame;
}

export function stopGame() {
    gameState.leaderBoard.push(gameState.TotalScore);
    window.cancelAnimationFrame(stopCycle);
    results();
}

function results() {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, context.width, context.height);
    context.beginPath();
    context.textAlign = "center";
    context.fillStyle = "#ff00ff";
    context.font = "bold 48px serif";
    context.fillText("Game Over! Your total score is: " + gameState.TotalScore,100, 30, [100, 500]);
    context.closePath();
    restart.style.visibility = 'visible';
	newMode.style.visibility = 'hidden';
}

function leaderBoard(){
    gameState.leaderBoard.sort(((a, b) => (b-a)));
    console.log(gameState.leaderBoard);
    leaderboard.innerText = "Leader Board \n";
    lastTick = performance.now();
    for(let i= 0;i<gameState.leaderBoard.length;i++){
        leaderboard.innerText += gameState.leaderBoard[i] + "\n";
    }
}

function onPreloadComplete() {
    leaderBoard();
    lastRender = lastTick;
    stopCycle = null;
    restart.style.visibility = 'hidden'
    init(canvas);
    run();
}

preload(onPreloadComplete);
