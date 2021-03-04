'use strict';

// <REFERENCES>
// https://www.youtube.com/results?search_query=Learn+HTML5+Canvas+By+Creating+A+Drawing+App+%7C+HTML+Canvas+Tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event

// <NOTES>
// click: press+release combined
// mousedown: fired the moment the button is initially pressed.

// <VARIABLES>
// let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let painting = false;

let blackButtonPen = document.querySelector('#blackButtonPen');
let redButtonPen = document.querySelector('#redButtonPen');
let yellowButtonPen = document.querySelector('#yellowButtonPen');
// let saveButton = document.querySelector('#saveButton');

canvas.addEventListener('mousedown', mouseStartPosition);
canvas.addEventListener('mouseup', mouseFinishPosition);
canvas.addEventListener('mousemove', mouseDraw);

blackButtonPen.addEventListener('click', changePenColorToBlack);
redButtonPen.addEventListener('click', changePenColorToRed);
yellowButtonPen.addEventListener('click', changePenColorToYellow);
// saveButton.addEventListener('click', savePhotoWithDrawing);

function changePenColorToBlack(){
  context.strokeStyle = "black";
}

function changePenColorToYellow(){
  context.strokeStyle = "yellow";
}

function changePenColorToRed(){
  context.strokeStyle = "red";
}

function mouseStartPosition(event) {
  painting = true;
  draw(event); //for drawing dots
}

function mouseFinishPosition() {
  painting = false;
  context.beginPath(); //to start new lines after one another
}

function mouseDraw(event) {  
  if (!painting) return;    
  context.lineWidth = 2; //drawing pen width
  context.lineCap = 'round';

  context.lineTo(event.offsetX, event.offsetY);  
  context.stroke();  
  context.beginPath(); //starts a new path by emptying the list of sub-paths.  
  context.moveTo(event.offsetX, event.offsetY);
  console.log(event.offsetX+" "+event.offsetY) //for testing coordinates
}