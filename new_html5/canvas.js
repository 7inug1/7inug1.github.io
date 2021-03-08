'use strict';
// import { key } from './values'
// <REFERENCES>
// https://www.youtube.com/results?search_query=Learn+HTML5+Canvas+By+Creating+A+Drawing+App+%7C+HTML+Canvas+Tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event

// <NOTES>
// click: press+release combined
// mousedown: fired the moment the button is initially pressed.

// <VARIABLES>
// let canvas = document.querySelector('#canvas');
// let context = canvas.getContext('2d');
let painting = false;

let whiteButtonPen = document.querySelector('#whiteButtonPen');
let blackButtonPen = document.querySelector('#blackButtonPen');
let redButtonPen = document.querySelector('#redButtonPen');
let yellowButtonPen = document.querySelector('#yellowButtonPen');
let saveButton = document.querySelector('#saveButton');

canvas.addEventListener('mousedown', mouseStartPosition);
canvas.addEventListener('mouseup', mouseFinishPosition);
canvas.addEventListener('mousemove', mouseDraw);

whiteButtonPen.addEventListener('click', changePenColorToWhite);
blackButtonPen.addEventListener('click', changePenColorToBlack);
redButtonPen.addEventListener('click', changePenColorToRed);
yellowButtonPen.addEventListener('click', changePenColorToYellow);
// saveButton.addEventListener('click', savePhotoWithDrawing);

loadImage();

window.addEventListener('load', function(){ 
  loadImage();
});

saveButton.addEventListener('click', saveImage);

function changePenColorToWhite(){
  context.strokeStyle = "white";
}

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
  console.log("mouseStartPosition");
  painting = true;
  mouseDraw(event); //for drawing dots
}

function mouseFinishPosition() {
  console.log("mouseFinishPosition");
  painting = false;
  context.beginPath(); //to start new lines after one another
}

function mouseDraw(event) {  
  console.log("mouseDraw");
  if (!painting) return;    
  context.lineWidth = 2; //drawing pen width
  context.lineCap = 'round';

  context.lineTo(event.offsetX, event.offsetY);  
  context.stroke();  
  context.beginPath(); //starts a new path by emptying the list of sub-paths.  
  context.moveTo(event.offsetX, event.offsetY);
  // console.log(event.offsetX+" "+event.offsetY) //for testing coordinates
}


function loadImage(){
  let img = new Image();
  console.log("loadImage")
  let key = "photoKey";
  let retrievingData = localStorage.getItem(key);

  img.src = retrievingData;

  context.drawImage(img, 0, 0);
  
}

// saveButton.addEventListener('click', saveImage);

function saveImage(){
  console.log("saveImage()")
  let key = "photoKey";
  let data = canvas.toDataURL('image/png');
  localStorage.setItem(key, data);
  alert("Photo saved to local storage!")

  // if (confirm("Do you want to save the photo in your device?")) {
  //   alert("yes clicked")
  //   let canvasImage = data;

  // } else {
  //   alert("no clicked")
  // } 
}