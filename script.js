let maxHeight = 350;
let minHeight = 50;
let ballimg = new Image();
let background = new Image();
background.src = "flap.png"
ballimg.src = "pngwing.com.png";
var GAME = {
    width: 600,
    height: 700,
    ifLost: false,
    backgroundColor: "aqua",
    speed: 1,
    score: 0,
    IfLost: false,
    drawbg() {
        canvasContext.fillStyle = GAME.backgroundColor;
        if (GAME.background) {
            canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);
        }
    }
}
var bird = {
    x: 100,
    y: 300,
    speed: 2,
    wight: 55,
    height: 55,
    yPos: 55,
    drawbird() {
        canvasContext.fillStyle = "yellow";
        if (bird.ballimg) {
            canvasContext.drawImage(bird.ballimg, bird.x, bird.y, bird.wight, bird.height)
        }
    }
}
var canvas = document.getElementById("canvas"); //получаем объект "холста"
var canvasContext = canvas.getContext("2d"); //получаем иструмент рисования
canvas.width = GAME.width;
canvas.height = GAME.height;
function Kolona(x) {
    this.x = x;
    this.y = 0;
    this.height = 275;
    this.width = 50;
    this.S = 150;
    this.drawkolona = function () {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
        canvasContext.fillRect(this.x, this.height + this.S, this.width, this.height)
    }
}
let kolona2 = new Kolona(GAME.width)
let kolona = new Kolona(GAME.width + 300)
window.onload = function () {
    bird.ballimg = ballimg;
    GAME.background = background;
}

function drawTubes() {
    kolona.drawkolona()
    kolona2.drawkolona()
}
function updateKolona() {
    kolona.x = kolona.x - GAME.speed;
    kolona2.x = kolona2.x - GAME.speed;

}
function ifBackOfScreen() {
    if (kolona.x < -kolona.width) {
        kolona.x = GAME.width;
        kolona.height = Math.random() * maxHeight + minHeight
    }
    if (kolona2.x < -kolona2.width) {
        kolona2.x = GAME.width;
        kolona2.height = Math.random() * maxHeight + minHeight
    }
}


function initEventListeners() {
    window.addEventListener("keydown", onCanvaskeyDown);
}
function onCanvaskeyDown(event) {
    if (event.key === "ArrowUp")
        bird.y = bird.y - bird.yPos;
}


function updateBird() {
    bird.y = bird.y + bird.speed;
    let losePositionIfOutofScreen = ((bird.y > GAME.height - bird.wight) || (bird.y < -10))    // Здесь все норм
    let losePositionIfHitOnKolona_1 = ((bird.x + bird.wight >= kolona.x) && (kolona.x + kolona.width > bird.x) && (bird.y < kolona.height)) || ((bird.y + bird.height > kolona.S + kolona.height) && (kolona.x + kolona.width >= bird.x) && (bird.x + bird.wight >= kolona.x))  //Проблема в первом условии
    let losePositionIfHitOnKolona_2 = ((bird.x + bird.wight >= kolona2.x) && (kolona2.x + kolona2.width >= bird.x) && (bird.y < kolona2.height)) || ((bird.y + bird.height > kolona2.S + kolona2.height) && (bird.x + bird.wight >= kolona2.x) && (kolona2.x + kolona2.width >= bird.x))   //Проблема в первом условии
    let winPosition = kolona.x + kolona.width + 2 <= 1 || kolona2.x + kolona.width + 2 <= 1
    if (losePositionIfOutofScreen) {
        GAME.IfLost = true;
    }
    if (losePositionIfHitOnKolona_2) {
        GAME.IfLost = true;
    }
    if (losePositionIfHitOnKolona_1) {
        GAME.IfLost = true;
    }
    if (winPosition) {
        GAME.score = GAME.score + 1
        console.log(GAME.score);
    }
}
function loseAnimation() {
    if (GAME.IfLost === true) {
        bird.y = bird.y + bird.speed
        if (bird.y <= 700) {
            alert("you lose");
        }
    }
}

function drawScore() {
    canvasContext.fillStyle = "black";
    canvasContext.font = "25px Calibri";
    canvasContext.fillText("Score:", 10, 50);
    canvasContext.fillText(GAME.score, 75, 50)
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    GAME.drawbg();
    bird.drawbird();
    drawTubes();
}
function play() {
    if (GAME.IfLost === false) {
        drawFrame();
        updateKolona();
        updateBird();
        ifBackOfScreen();
        drawScore()
        requestAnimationFrame(play);
    }
    else { loseAnimation() }
}
play();
initEventListeners();


