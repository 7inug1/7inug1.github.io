//Things to remember :
//1. window.onload = redraw;
//2. event.key=="ArrowLeft"
//3. ctx.drawImage(img, clipStartX, clipStartY, clipEndX, clipEndY, XonCanvas, YonCanvas, imgWidthX, imgWidthY)
//ctx.drawImage(doraemon,0,0,200,200,doraemonX,300,100,100);

// width:600
// height:400
let canvas=document.getElementById("myCanvas");
let ctx=canvas.getContext("2d");
//------------------------------------------------
let score=0;
let timer;
let time;
let goal=5;
//------------------------------------------------
let background=new Image();
background.src="room.jpg";
let doraemon=new Image();//basket
doraemon.src="doraemon.png";
let dorayaki=new Image();//apple
dorayaki.src='dorayaki.png';
//------------------------------------------------
let dora=new Doraemon(-25, 300);
let yaki=new Dorayaki((Math.floor)(Math.random()*556), -15);
window.onload = redraw;
document.addEventListener("keydown", press);
displayGoal();
//------------------------------------------------
//basket
function Doraemon(x, y){
  this.x=x;
  this.y=y;
}
//apple
function Dorayaki(x, y){
  this.x=x;
  this.y=y;
}

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

function press(){
  if(event.key=="ArrowLeft"){
    moveLeft();
  }else if(event.key=="ArrowRight"){
    moveRight();
  }
}

function checkCollision(){
  //if(yakileft vs left / yakileft vs right) || yakiright vs left / yakiright vs right
  if(    (yaki.x-30>=dora.x)&&(yaki.x<=dora.x+80) ||  (yaki.x+45-30>=dora.x)&&(yaki.x+45<=dora.x+100)){
    return true;
  }else{
    return false;
  }
}

function executeProgram(){
  output.innerHTML=score;
  yaki.y+=10;
  redraw();
  if(yaki.y>400){
    yaki.x=(Math.floor)(Math.random()*556);
    yaki.y=0;
  }else if(yaki.y+50>dora.y && checkCollision()==true){
    score+=1;
    output.innerHTML=score;
    yaki.x=(Math.floor)(Math.random()*556);
    yaki.y=0;
  }
}

function startTimer(){
  time=0;//convert a variable to a number
  if(timer==undefined){
      timer=setInterval(count, 100);
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

function displayGoal(){
  goaldisplay.innerHTML=goal;
}
