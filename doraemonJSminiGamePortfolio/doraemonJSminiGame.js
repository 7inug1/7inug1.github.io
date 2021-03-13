// -Instruction : 
// Use arrowleft and arrowright keyboards to move the character around to catch the
// snack dropping from the top. If you achieve the designated score, you win the game.
//
// -(Personal) Note :
// Things to remember :
// 1. window.onload = redraw;
// 2. event.key=="ArrowLeft"
// 3. ctx.drawImage(img, clipStartX, clipStartY, clipEndX, clipEndY, XonCanvas, YonCanvas, imgWidthX, imgWidthY)
// ctx.drawImage(doraemon,0,0,200,200,doraemonX,300,100,100);
//
// Canvas size :
// width:600
// height:400

let canvas=document.querySelector("#canvas");
let ctx=canvas.getContext("2d");
//------------------------------------------------
let score=0;
let goal=5;
let timer = 0;
let time = 0;
//------------------------------------------------
let background=new Image();
background.src="./img/room.jpg";
let doraemon=new Image();//basket
doraemon.src="./img/doraemon.png";
let dorayaki=new Image();//apple
dorayaki.src='./img/dorayaki.png';
//------------------------------------------------
let dora=new Doraemon(-25, 300); //doraemon's starting position
let yaki=new Dorayaki((Math.floor)(Math.random()*556), -15); //yaki being called at a random position at the top
let arrowLeftButton = document.querySelector('#arrowLeftButton');
let arrowRightButton = document.querySelector('#arrowRightButton');

window.onload = redraw; 
document.addEventListener("keydown", pressdown); 
document.addEventListener("keyup", pressup);

displayGoal();

function Doraemon(x, y){
  this.x=x;
  this.y=y;
}

function Dorayaki(x, y){
  this.x=x;
  this.y=y;
}
//------------------------------------------------
//Drawing on page
function drawBackground(){
  ctx.clearRect(0,0,600,400);
  ctx.drawImage(background, 0, 0, 600, 400);
}

function drawDoraemon(){
  ctx.drawImage(doraemon,0,0,200,200,dora.x,dora.y,100,100);
}

function drawDorayaki(){
  ctx.drawImage(dorayaki, yaki.x, yaki.y, 45, 70);
}

function redraw(){
  drawBackground();
  drawDoraemon();
  drawDorayaki();
}

window.onload = function() {
  drawBackground();
  drawDoraemon();
  drawDorayaki();
}
//------------------------------------------------
//Move doraemon's directions
function moveLeft(){
  if(dora.x>(-25))
    dora.x-=25;
    redraw();
}

function moveRight(){
  if(dora.x<525)
    dora.x+=25;
    redraw();
}

function pressdown(event){
  if(event.key=="ArrowLeft"){
    moveLeft();
    arrowLeftButton.style.scale = "1.1";
  }else if(event.key=="ArrowRight"){
    moveRight();
    arrowRightButton.style.scale = "1.1";
  }
}

function pressup(event){
  if(event.key=="ArrowLeft"){
    // moveLeft();
    arrowLeftButton.style.scale = "1.0";
  }else if(event.key=="ArrowRight"){
    // moveRight();
    arrowRightButton.style.scale = "1.0";
  }
}
//------------------------------------------------
function checkCollision(){
  //if(yakileft vs left / yakileft vs right) || yakiright vs left / yakiright vs right
  if( (yaki.x-30>=dora.x)&&(yaki.x<=dora.x+80) || (yaki.x+45-30>=dora.x)&&(yaki.x+45<=dora.x+100) ){
    return true;
  }else{
    return false;
  }
}
//------------------------------------------------
//Timer-related functions
function startTimer(){
  time=0;//convert a variable to a number
  if(timer==undefined){
      timer=setInterval(count, 100); //interval by 0.1 seconds || 100 milliseconds
  }
}

function count(){
  if(score>=goal){
    alert("You win!");
    stopTimer();
    reset();
  }else{
    executeProgram();
  }
}

function stopTimer(){
  clearInterval(timer);
  timer=undefined;
}

function reset(){
  score=0;
}
//------------------------------------------------
//running the function by each interval.
function executeProgram(){
  scoreEarned.innerHTML=score;
  yaki.y+=10;
  redraw();
  //yaki not being caught into the basket (earning no score)
  if(yaki.y>400){
    yaki.x=(Math.floor)(Math.random()*556);
    yaki.y=0;
  }
  //yaki being caught into the basket (earning score)
  else if(yaki.y+50>dora.y && checkCollision()==true){
    score+=1;
    scoreEarned.innerHTML=score;
    yaki.x=(Math.floor)(Math.random()*556);
    yaki.y=0;
  }
}

function displayGoal(){
  scoreGoal.innerHTML=goal;
  scoreEarned.innerHTML=score;
}
