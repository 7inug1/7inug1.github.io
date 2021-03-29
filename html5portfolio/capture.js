/*
<Source>
https://github.com/mdn/samples-server/tree/master/s/webrtc-capturestill
https://www.w3schools.com/tags/av_event_loadstart.asp
*/
'use strict';

const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const toggleButton = document.getElementById('toggleButton');

let width = 0;
let height = 0;
let cameraIsOn = false;

window.addEventListener('load', initialize);
toggleButton.addEventListener('click', toggleCamera);
cameraCaptureButton.addEventListener('click', takepicture);

function initialize() {
  // landscape mode
  if (window.innerWidth >= window.innerHeight) {
    width = window.innerWidth / 2;
    height = (width / 8) * 6;
  }

  // portrait mode
  else {
    width = window.innerWidth;
    height = (width / 8) * 6;
  }

  video.setAttribute('width', `${width}px`);
  video.setAttribute('height', `${height}px`);
  canvas.setAttribute('width', `${width}px`);
  canvas.setAttribute('height', `${height}px`);
  loadImage();
}

function toggleCamera() {
  const constraints = {
    audio: false,
    video: true,
  };

  // turn camera on
  if (cameraIsOn === false) {
    cameraIsOn = true;
    startWebcamStreaming();
  } else {
    cameraIsOn = false;
    /* Source: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop */
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      video.srcObject = null;
      track.stop();
    });
  }
}

function startWebcamStreaming() {
  const constraints = {
    audio: false,
    video: true,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream; // successful callback
      video.play();
    })
    // Likely error cases:
    // 1. no compatible camera connected
    // 2. user denied access
    .catch((err) => {
      throw Error('An error occurred: ' + err);
    });
}

function takepicture() {
  if (cameraIsOn) {
    context.drawImage(video, 0, 0, width, height);
    saveImage();
  }
}

function saveImage() {
  const key = 'photoKey'; // refers to the key of localStorage
  const data = canvas.toDataURL('image/png');
  localStorage.setItem(key, data);
  alert('Photo saved to local storage.');
}
