// <REFERENCES>
// https://www.youtube.com/results?search_query=Learn+HTML5+Canvas+By+Creating+A+Drawing+App+%7C+HTML+Canvas+Tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event

// <NOTES>
// click: press+release combined
// mousedown: fired the moment the button is initially pressed.

// <VARIABLES>
let canvas = document.getElementById('canvasOne');
let context = canvas.getContext('2d');
let painting = false;

let frame = document.getElementById('frame');
let frameContext = frame.getContext('2d');
let photoFrameImage = new Image();
photoFrameImage.src = '../images/photoFrameImage.png'; //https://toppng.com/old-frame-border-png-old-photo-frames-PNG-free-PNG-Images_167585

photoFrameImage.addEventListener('load', function() {
  // execute drawImage statements here
  frameContext.drawImage(photoFrameImage, 0, 0);
}, false);

let blackButton = document.getElementById('blackButton');
let redButton = document.getElementById('redButton');
let yellowButton = document.getElementById('yellowButton');
let saveButton = document.getElementById('saveButton');

loadImage();

blackButton.addEventListener('click', changePenColorToBlack);
redButton.addEventListener('click', changePenColorToRed);
yellowButton.addEventListener('click', changePenColorToYellow);
saveButton.addEventListener('click', savePhotoWithDrawing);

canvas.addEventListener('mousedown', mouseStartPosition);
canvas.addEventListener('mouseup', mouseFinishPosition);
canvas.addEventListener('mousemove', mouseDraw);

canvas.addEventListener('touchstart', touchStartPosition);
canvas.addEventListener('touchend', touchFinishPosition);
canvas.addEventListener('touchmove', touchDraw);

function mouseStartPosition(event) {
  painting = true;
  draw(event); //for drawing dots
}

function touchStartPosition(event) {
  painting = true;
  draw(event); //for drawing dots
}
  
function mouseFinishPosition() {
  painting = false;
  context.beginPath(); //to start new lines after one another
}

function touchFinishPosition() {
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

function touchmove(event) {  
  
  
  if (!painting) return;  
  let touch = event.touches[0];  
  context.lineWidth = 2; //drawing pen width
  context.lineCap = 'round';

  context.lineTo(touch.offsetX, touch.offsetY);  
  context.stroke();  
  context.beginPath(); //starts a new path by emptying the list of sub-paths.  
  context.moveTo(touch.offsetX, touch.offsetY);
  console.log(touch.offsetX+" "+touch.offsetY) //for testing coordinates
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

function savePhotoWithDrawing(){
  saveImage();
}

function saveImage(){
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  alert("saved")
  let key = "photoKey"; 
  data = canvasOne.toDataURL('image/png');
  localStorage.setItem(key, data);
}

function loadImage(){
  let retrievingData = localStorage.getItem(key);
  console.log("retrievingData: " + (retrievingData));
  
  let img = new Image();
  img.onload = function(){
    context.drawImage(img, 0, 0);
  }
  // console.log("changed to canvas");
  img.src = retrievingData;
}