'use strict';
// <VARIABLES> - Related to web camera
let video = document.getElementById('video');
let streaming = false;
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
let constraints = (window.constraints = {
  audio: false,
  video: true,
});

// <VARIABLES> - Related to the canvas in 'Gallery' section
// let rightTop = document.querySelector('.right-top');
// let width = window.getComputedStyle(rightTop).getPropertyValue('width');
// let height = window.getComputedStyle(rightTop).getPropertyValue('height');
// let width = 641;
// let height = 462.933;
let width = window.innerWidth / 2;
let height = window.innerHeight * 0.8;

let canvasOne = document.getElementById('canvasOne');
let contextOne = canvasOne.getContext('2d');
let checkbox = document.getElementById('checkbox');
let cameraIsOn = false;

// <VARIABLES> - Buttons on web camera
let cameraOnButton = document.getElementById('cameraOnButton');
let cameraOffButton = document.getElementById('cameraOffButton');
let cameraCaptureButton = document.getElementById('cameraCaptureButton');

// <VARIABLES> - Related to 'local storage'
// data: containing a representation of the image in the format specified by the type parameter (defaults to PNG). 
let data;
let key = "photoKey"; 

let canvasAndFrame = document.getElementById('canvasAndFrame');
// let frame = document.getElementById('frame');
// let canvasOne = document.getElementById('canvasOne');
canvasAndFrame.style.width=`${width}px`;
canvasAndFrame.style.height=`${height}px`;
canvasOne.style.width=`681px`;
canvasOne.style.height=`642px`;


console.log("camera");
// <EVENTLISTENERS>
checkbox.checked=false;
checkbox.addEventListener('click', toggleCamera);

// cameraOnButton.addEventListener('click', toggleCamera);
// cameraOffButton.addEventListener('click', turnCameraOff);
cameraCaptureButton.addEventListener('click', captureImage);

// <FUNCTIONS>
function toggleCamera(){
  if(cameraIsOn===false){
    cameraIsOn=true;
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (error) {
        console.log('Error has occured: ' + error);
      });
  }else{
    cameraIsOn=false;
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
}

function captureImage(){
  if (cameraIsOn===true) {
    // alert("photo saved")
    // contextOne.drawImage(video, 0, 0, 641, 462.933);
    contextOne.drawImage(video, 0, 0, width, height);
    savePhoto();
  }
}

function savePhoto(){
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  data = canvasOne.toDataURL('image/png');
  localStorage.setItem(key, data);
}