/*
<Instruction>
Use arrowleft and arrowright keyboards to move the character around to catch
dorayaki dropping from the top. If you achieve the designated score, you win the game.

<Note>
Things to remember :
1. window.onload = redraw;
2. event.key=="ArrowLeft"
3. ctx.drawImage(img, clipStartX, clipStartY, clipEndX, clipEndY, XonCanvas, YonCanvas, imgWidthX, imgWidthY)
ctx.drawImage(doraemon,0,0,200,200,doraemonX,300,100,100);

<Canvas size>
width: 600
height: 400

<Number meaning>
-The numbers used are within the range of canvas size, 600 x 400
-allowance for left end of canvas ~ right end of canvas: -25 ~ 556
*/
'use strict';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
//------------------------------------------------
const goal = 3;
let score = 0;
let timer;
let time;
//------------------------------------------------
const backgroundImage = new Image();
backgroundImage.src = './img/room.jpg';
const doraemonImage = new Image();
doraemonImage.src = './img/doraemon.png';
const dorayakiImage = new Image();
dorayakiImage.src = './img/dorayaki.png';
//------------------------------------------------
const doraemon = new Doraemon(-25, 300); //doraemon's starting position in (x, y)
const dorayaki = new Dorayaki(Math.floor(Math.random() * 556), -15); // dorayaki's starting position in (x, y)
const arrowLeftButton = document.querySelector('#arrowLeftButton');
const arrowRightButton = document.querySelector('#arrowRightButton');

document.addEventListener('keydown', keyPressDown);
document.addEventListener('keyup', keyPressUp);
window.onload = () => {
  drawBackground();
  drawDoraemon();
  drawDorayaki();
  redraw();
  displayGoal();
};

function Doraemon(x, y) {
  this.x = x;
  this.y = y;
}

function Dorayaki(x, y) {
  this.x = x;
  this.y = y;
}
//------------------------------------------------
//Drawing on page
function drawBackground() {
  ctx.clearRect(0, 0, 600, 400);
  ctx.drawImage(backgroundImage, 0, 0, 600, 400);
}

function drawDoraemon() {
  ctx.drawImage(
    doraemonImage,
    0,
    0,
    200,
    200,
    doraemon.x,
    doraemon.y,
    100,
    100
  );
}

function drawDorayaki() {
  ctx.drawImage(dorayakiImage, dorayaki.x, dorayaki.y, 45, 70);
}

function redraw() {
  drawBackground();
  drawDoraemon();
  drawDorayaki();
}

//------------------------------------------------
//Move doraemon's directions
function moveLeft() {
  if (doraemon.x > -25) doraemon.x -= 25; // if not over the left end of canvas
  redraw();
}

function moveRight() {
  if (doraemon.x < 525) doraemon.x += 25; // if not over the right end of canvas
  redraw();
}

function keyPressDown(event) {
  if (event.key === 'ArrowLeft') {
    moveLeft();
    arrowLeftButton.style.scale = '1.1';
  } else if (event.key === 'ArrowRight') {
    moveRight();
    arrowRightButton.style.scale = '1.1';
  }
}

function keyPressUp(event) {
  if (event.key === 'ArrowLeft') {
    arrowLeftButton.style.scale = '1.0';
  } else if (event.key === 'ArrowRight') {
    arrowRightButton.style.scale = '1.0';
  }
}
//------------------------------------------------
// check collision between doraemon and dorayaki to assign score if true
function checkCollision() {
  // if(
  // dorayaki.left vs doraemon.left && dorayaki.left vs doraemon.right) ||
  // dorayaki.right vs doraemon.left && dorayaki.right vs doraemon.right
  // )
  if (
    (dorayaki.x - 30 >= doraemon.x && dorayaki.x <= doraemon.x + 80) ||
    (dorayaki.x + 45 - 30 >= doraemon.x && dorayaki.x + 45 <= doraemon.x + 100)
  ) {
    return true;
  } else {
    return false;
  }
}
//------------------------------------------------
//Timer-related functions
function startTimer() {
  time = 0; //convert a variable to a number
  if (timer === undefined) {
    timer = setInterval(count, 100); //interval by 0.1 seconds || 100 milliseconds
  }
}

function count() {
  if (score >= goal) {
    alert('You win!');
    stopTimer();
    reset();
  } else {
    executeProgram();
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = undefined;
}

function reset() {
  score = 0;
}
//------------------------------------------------
// function starting a new game
function executeProgram() {
  scoreEarned.innerHTML = score;
  dorayaki.y += 10;
  redraw();
  // 1. not earning score
  //dorayaki not being caught into the basket (going over the botton end of canvas)
  if (dorayaki.y > 400) {
    // re-start dorayaki starting from the top
    dorayaki.x = Math.floor(Math.random() * 556);
    dorayaki.y = 0;
  }
  // 2. earning score
  //dorayaki being caught into doraemon
  else if (dorayaki.y + 50 > doraemon.y && checkCollision() === true) {
    score += 1;
    scoreEarned.innerHTML = score;
    dorayaki.x = Math.floor(Math.random() * 556);
    dorayaki.y = 0;
  }
}

function displayGoal() {
  scoreGoal.innerHTML = goal;
  scoreEarned.innerHTML = score;
}
