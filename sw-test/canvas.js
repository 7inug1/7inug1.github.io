// https://www.youtube.com/results?search_query=Learn+HTML5+Canvas+By+Creating+A+Drawing+App+%7C+HTML+Canvas+Tutorial
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event
// click: press+release combined
// mousedown: fired the moment the button is initially pressed.
let canvas = document.getElementById('canvasOne');
let context = canvas.getContext('2d');
let painting = false;

let frame = document.getElementById('frame');
let frameContext = frame.getContext('2d');
let photoFrameImage = new Image();
photoFrameImage.src = '../images/photoFrameImage.png';

photoFrameImage.addEventListener('load', function() {
  // execute drawImage statements here
  frameContext.drawImage(photoFrameImage, 0, 0, 399, 330);
}, false);



canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishPosition);
canvas.addEventListener('mousemove', draw);

function startPosition(event) {
  painting = true;
  draw(event); //for drawing dots
}
  
function finishPosition() {
  painting = false;
  context.beginPath(); //to start new lines after one another
}
// beginPath->moveTo->lineTo->stroke
function draw(event) {  
  if (!painting) return;    
  context.lineWidth = 2; //drawing pen width
  context.lineCap = 'round';

  context.lineTo(event.offsetX-40, event.offsetY-45);  
  context.stroke();  
  context.beginPath(); //starts a new path by emptying the list of sub-paths.  
  context.moveTo(event.offsetX-40, event.offsetY-45);
  // console.log(event.offsetX+" "+event.offsetY) //for testing coordinates
}
