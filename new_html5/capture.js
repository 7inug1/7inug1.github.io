/*
Source:
https://github.com/mdn/samples-server/tree/master/s/webrtc-capturestill

*/

'use strict';

let video = document.querySelector('#video');
let canvas = document.querySelector('#canvas');
// let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
// let photo = document.querySelector('#photo');
// let startbutton = document.querySelector('#startbutton');

let width;
let height;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

let streaming = false;

let checkbox = document.getElementById('checkbox');
checkbox.checked=false;
let cameraIsOn = false;


window.addEventListener('load', initialize, false);
checkbox.addEventListener('click', toggleCamera);
cameraCaptureButton.addEventListener('click', takepicture);

function initialize(){
  // clearphoto();
  // If landscape
  if(window.innerWidth>=window.innerHeight){
    // console.log("landscape");
    width = window.innerWidth/2;   
    height = (width / 8) * 6;    
  }
  
  // If portrait
  else{
    // console.log("portrait");
    width = window.innerWidth;   
    height = (width / 8) * 6;  
  }

  // photo.setAttribute('width', `${width}px`);
  // photo.setAttribute('height', `${height}px`);
  video.setAttribute('width', `${width}px`);
  video.setAttribute('height', `${height}px`);
  canvas.setAttribute('width', `${width}px`);
  canvas.setAttribute('height', `${height}px`);
  console.log("initialize")
}

function toggleCamera(){
  initialize();
  console.log("toggleCamera()")

  // video.setAttribute('width', `${width}px`);
  // video.setAttribute('height', `${height}px`);
  // canvas.setAttribute('width', `${width}px`);
  // canvas.setAttribute('height', `${height}px`);
  // photo.setAttribute('width', `${width}px`);
  // photo.setAttribute('height', `${height}px`);
  
  let constraints = {
    audio: false,
    video: true
  };

  // turn camera on
  if(cameraIsOn===false){
    cameraIsOn=true;
    startWebcamStreaming();
  }
  else{
    cameraIsOn=false;

    let stream = video.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function(track) {
      video.srcObject = null;
      track.stop();
    });
  }
}

/*
This function's job is to request access to the user's webcam, 
initialize the output <img> to a default state, 
and to establish the event listeners needed to receive each 
frame of video from the camera and react when the button is 
clicked to capture an image.
*/

function startWebcamStreaming() {
  /* Here, we're calling MediaDevices.getUserMedia() and 
  requesting a video stream (without audio). 
  It returns a promise which we attach success and 
  failure callbacks to.*/

  /*The success callback receives a stream object as input. 
  It is the <video> element's source to our new stream.*/

  let constraints = {
    audio: false,
    video: true
  };

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    video.srcObject = stream;

    /*Once the stream is linked to the <video> element, 
    we start it playing by calling HTMLMediaElement.play().*/
    video.play();
  })
  /*The error callback is called if opening the stream doesn't work. This will happen for example if there's no compatible camera connected, or the user denied access.*/
  .catch(function(err) {
    console.log("An error occurred: " + err);
  });

  video.addEventListener('loadstart', function(event){
    console.log("1. loadstart")
  })
  video.addEventListener('durationchange', function(event){
    console.log("2. durationchange")
  })
  video.addEventListener('loadedmetadata', function(event){
    console.log("3. loadedmetadata")
  })
  video.addEventListener('loadeddata', function(event){
    console.log("4. loadeddata")
  })
  video.addEventListener('progress', function(event){
    console.log("5. progress")
  })

  /*The canplay event is fired when the user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content. */
  video.addEventListener('canplay', function(event){
    console.log("6. canplay");
    video.setAttribute('height', 'auto');
    // canvas.setAttribute('height', 'auto');
    // canvas.setAttribute('min-height', `${height}px`);
    // photo.setAttribute('height', 'auto');
    // console.log('Video can start, but not sure it will play through.');
    if (!streaming) {    
      // video.setAttribute('width', width);
      // video.setAttribute('height', height);
      // canvas.setAttribute('width', width);
      // canvas.setAttribute('height', height);
      /*Finally, we set the streaming variable to true to prevent us from inadvertently running this setup code again. */
      streaming = true;
      console.log("inside of canplay")
    }
  }, false);

  video.addEventListener('canplaythrough', function(event){
    console.log("7. canplaythrough")
  })
  
  // clearphoto();
}

// Fill the photo with an indication that none has been
// captured.

function clearphoto() {
  var context = canvas.getContext('2d');
  context.fillStyle = 'red';
  // context.fillRect(0, 0, width, height);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}


function takepicture() {
  if (width && height) {
    console.log("take picture");
    // canvas.width = width;
    // canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    
    // NOTICE!
    // var data = canvas.toDataURL('image/png');
    // photo.setAttribute('src', data);
  } 
  // else {
    // clearphoto();
  // }
}

// Set up our event listener to run the startup process
// once loading is complete.


