let width = 320;
let height = 240;

let video = document.getElementById('video');
let photo = document.createElement('img');

let canvasOne = document.getElementById('canvasOne');
let contextOne = canvasOne.getContext('2d');


let streaming = false;

let imgNode = document.createElement("img");
let key = "photoKey";    

let cameraOnButton = document.getElementById('cameraOnButton');
let cameraOffButton = document.getElementById('cameraOffButton');
let cameraCaptureButton = document.getElementById('cameraCaptureButton');

// TO BE USED AS LOCAL STORAGE
// let capturedPhotoSaveButton = document.getElementById('capturedPhotoSaveButton');
// data: containing a representation of the image in the format specified by the type parameter (defaults to PNG). 
let data;
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// "constraints" parameters
let constraints = (window.constraints = {
  audio: false,
  video: true,
});

// let testPhoto = document.getElementById('hello');
loadImage();

cameraOnButton.addEventListener('click', turnCameraOn);
cameraOffButton.addEventListener('click', turnCameraOff);
cameraCaptureButton.addEventListener('click', captureImage);

function turnCameraOn(){
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (error) {
      console.log('Error has occured: ' + error);
    });
}

// reference: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop
function turnCameraOff(){
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
      let tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      // srcObject is set to null to sever the link to the MediaStream object so it can be released.
      video.srcObject = null;
    })
    .catch(function (error) {
      console.log('getUserMedia() error', error);
    });
}

function captureImage(){
  if (width && height) {
    contextOne.drawImage(video, 0, 0, width, height);
    saveImage();
  }
}

function saveImage(){
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  data = canvasOne.toDataURL('image/png');
  localStorage.setItem(key, data);
}

function loadImage(){
  let retrievingData = localStorage.getItem(key);
  // imgNode.setAttribute('id', 'savedImage');
  // imgNode.setAttribute('alt', '');
  imgNode.setAttribute('src', retrievingData);
  // imgNode.setAttribute('ondragstart', 'drag(event)');
  contextOne.drawImage(imgNode, 0, 0, width, height);
}

