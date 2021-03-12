'use strict';
// <REFERENCES>
// https://www.youtube.com/results?search_query=Learn+HTML5+Canvas+By+Creating+A+Drawing+App+%7C+HTML+Canvas+Tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event

// <NOTES>
// click: press+release combined
// mousedown: fired the moment the button is initially pressed.

// <VARIABLES>
// let painting = false;
let blackButtonPen = document.querySelector('#blackButtonPen');
let redButtonPen = document.querySelector('#redButtonPen');
let yellowButtonPen = document.querySelector('#yellowButtonPen');
let saveButton = document.querySelector('#saveButton');
let removeButton = document.querySelector('#removeButton');
let drawing = false;
let mousePosition = { x:0, y:0 };
let lastPosition = mousePosition;

blackButtonPen.addEventListener('click', changePenColorToBlack);
redButtonPen.addEventListener('click', changePenColorToRed);
yellowButtonPen.addEventListener('click', changePenColorToYellow);

loadImage();
window.addEventListener('load', () => loadImage());
saveButton.addEventListener('click', saveImage);
removeButton.addEventListener('click', removeImageFromLocalStorage);

function loadImage(){
  let img = new Image();
  let key = "photoKey";
  let retrievingData = localStorage.getItem(key);
  console.log("loadImage")
  img.src = retrievingData;
  context.drawImage(img, 0, 0);
}

function saveImage(){
  let key = "photoKey";
  let data = canvas.toDataURL('image/png');
  localStorage.setItem(key, data);
  alert("Photo saved to local storage!")
}

function removeImageFromLocalStorage(){

  if(localStorage.length !== 0){
    localStorage.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    alert("photo removed from local storage!")
  }
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
// window.addEventListener('load', () => loadImage());
canvas.addEventListener("mousedown", (event) => {
  drawing = true;
  lastPosition = getMousePosition(canvas, event);
});

canvas.addEventListener("mouseup", (event) => {
  drawing = false;
});

canvas.addEventListener("mousemove", (event) => {
  mousePosition = getMousePosition(canvas, event);
});

// Get the position of the mouse relative to the canvas
function getMousePosition(canvas, event) {
  let rectangle = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rectangle.left,
    y: event.clientY - rectangle.top
  };
}

canvas.addEventListener("touchstart", (event) => {
  event.preventDefault(); //prevent scrolling while touch-drawing
  mousePosition = getTouchPos(canvas, event);
  let touch = event.touches[0];
  let mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault(); //prevent scrolling while touch-drawing
  let touch = event.touches[0];
  let mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", (event) => {
  event.preventDefault(); //prevent scrolling while touch-drawing
  let mouseEvent = new MouseEvent("mouseup", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvas, touchEvent) {
  let rectangle = canvas.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rectangle.left,
    y: touchEvent.touches[0].clientY - rectangle.top
  };
}

window.requestAnimationFrame = (function (callback) {
  return window.requestAnimationFrame || 
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimaitonFrame ||
  function (callback) {
    window.setTimeout(callback, 1000/60);
  };
})();

// function for drawing the signature, connecting the previous and current mouse positions with a line (if drawing is enabled)
function drawOnCanvas() {
  if (drawing) {
    context.lineWidth = 2; //drawing pen width
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(mousePosition.x, mousePosition.y);
    context.stroke();
    lastPosition = mousePosition;
  }
}

(function drawLoop () {
  requestAnimationFrame(drawLoop);
  drawOnCanvas();
})();