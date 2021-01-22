// <VARIABLES> - Related to web camera
let video = document.getElementById('video');
let streaming = false;
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
let constraints = (window.constraints = {
  audio: false,
  video: true,
});

// <VARIABLES> - Related to the canvas in 'Gallery' section
let width = 641;
let height = 462.933;

let canvasOne = document.getElementById('canvasOne');
let contextOne = canvasOne.getContext('2d');



// <VARIABLES> - Buttons on web camera
let cameraOnButton = document.getElementById('cameraOnButton');
let cameraOffButton = document.getElementById('cameraOffButton');
let cameraCaptureButton = document.getElementById('cameraCaptureButton');

// <VARIABLES> - Related to 'local storage'
// data: containing a representation of the image in the format specified by the type parameter (defaults to PNG). 
let data;
let key = "photoKey"; 

console.log("camera")
// <EVENTLISTENERS>
cameraOnButton.addEventListener('click', turnCameraOn);
cameraOffButton.addEventListener('click', turnCameraOff);
cameraCaptureButton.addEventListener('click', captureImage);

// <FUNCTIONS>
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