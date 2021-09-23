/*
<REFERENCES>
https://www.youtube.com/results?search_query=Learn+HTML5+Canvas+By+Creating+A+Drawing+App+%7C+HTML+Canvas+Tutorial
https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event

<NOTES>
click: press+release combined
mousedown: fired the moment the button is initially pressed.
*/
'use strict';

const blackButtonPen = document.querySelector('#blackButtonPen');
const redButtonPen = document.querySelector('#redButtonPen');
const yellowButtonPen = document.querySelector('#yellowButtonPen');
const saveButton = document.querySelector('#saveButton');
const removeButton = document.querySelector('#removeButton');
let drawing = false;
let mousePosition = function (x, y) {
  this.x = 0;
  this.y = 0;
  return x + y;
};
let lastPosition = mousePosition;

blackButtonPen.addEventListener('click', changePenColorToBlack);
redButtonPen.addEventListener('click', changePenColorToRed);
yellowButtonPen.addEventListener('click', changePenColorToYellow);
saveButton.addEventListener('click', saveImage);
removeButton.addEventListener('click', removeImageFromLocalStorage);
loadImage();
drawLoop();

function loadImage() {
  const img = new Image();
  const key = 'photoKey';
  const retrievingData = localStorage.getItem(key);
  img.src = retrievingData;
  context.drawImage(img, 0, 0);
}

function saveImage() {
  const key = 'photoKey';
  const data = canvas.toDataURL('image/png');
  localStorage.setItem(key, data);
  alert('Photo saved to local storage.');
}

function removeImageFromLocalStorage() {
  if (localStorage.length !== 0) {
    localStorage.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    alert('Photo removed from local storage!');
  }
}

function changePenColorToBlack() {
  context.strokeStyle = 'black';
}

function changePenColorToYellow() {
  context.strokeStyle = 'yellow';
}

function changePenColorToRed() {
  context.strokeStyle = 'red';
}

canvas.addEventListener('mousedown', (event) => {
  drawing = true;
  lastPosition = getMousePosition(canvas, event);
});

canvas.addEventListener('mouseup', (event) => {
  drawing = false;
});

canvas.addEventListener('mousemove', (event) => {
  mousePosition = getMousePosition(canvas, event);
});

function getMousePosition(canvas, event) {
  const rectangle = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rectangle.left,
    y: event.clientY - rectangle.top,
  };
}

canvas.addEventListener(
  'touchstart',
  (event) => {
    event.preventDefault(); //prevent scrolling while touch-drawing
    mousePosition = getTouchPosition(canvas, event);
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);

canvas.addEventListener(
  'touchmove',
  (event) => {
    event.preventDefault(); //prevent scrolling while touch-drawing
    let touch = event.touches[0];
    let mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  },
  false
);

function getTouchPosition(canvas, touchEvent) {
  let rectangle = canvas.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rectangle.left,
    y: touchEvent.touches[0].clientY - rectangle.top,
  };
}

function drawOnCanvas() {
  if (drawing) {
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(mousePosition.x, mousePosition.y);
    context.stroke();
    lastPosition = mousePosition;
  }
}

function drawLoop() {
  requestAnimationFrame(drawLoop);
  drawOnCanvas();
}
