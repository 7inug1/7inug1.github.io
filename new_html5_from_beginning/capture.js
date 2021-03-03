/*
Source:
https://github.com/mdn/samples-server/tree/master/s/webrtc-capturestill

*/

'use strict';

let width;
let height;
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;



let video = null;
let canvas = null;
let photo = null;
let startbutton = null;
let streaming = false;




let checkbox = document.getElementById('checkbox');
checkbox.checked=false;
let cameraIsOn = false;
checkbox.addEventListener('click', toggleCamera);
cameraCaptureButton.addEventListener('click', captureImage);

function captureImage(){
  takepicture();
}

function toggleCamera(){
  console.log("toggleCamera()")
  let constraints = {
    audio: false,
    video: true
  };

  if(cameraIsOn===false){
    cameraIsOn=true;

    video = document.querySelector('#video');
    canvas = document.querySelector('#canvas');
    photo = document.querySelector('#photo');
    startbutton = document.querySelector('#startbutton');
  
    video.setAttribute('width', `${width}px`);
    video.setAttribute('height', `${height}px`);
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);
    photo.setAttribute('width', `${width}px`);
    photo.setAttribute('height', `${height}px`);

    startup();

    // navigator.mediaDevices.getUserMedia(constraints)
    // .then(function(stream) {
      // video.srcObject = stream;

      /*Once the stream is linked to the <video> element, 
      we start it playing by calling HTMLMediaElement.play().*/
      // video.play();
  // })
  }
  else{
    cameraIsOn=false;


  


    let stream = video.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function(track) {
      video.srcObject = null;
      track.stop();
    });

    

    // <COMMENT OUT>
    // navigator.mediaDevices.getUserMedia(constraints)
    //   .then(function (stream) {
    //     video.srcObject = stream;
    //     let tracks = stream.getTracks();
    //     tracks.forEach(function(track) {
    //       track.stop();
    //     });
    //     // srcObject is set to null to sever the link to the MediaStream object so it can be released.
    //     video.srcObject = null;
    //   })
    //   .catch(function (error) {
    //     console.log('getUserMedia() error', error);
    //   });
      // video = null;
      // canvas = null;
      // photo = null;
  }
}

/*
This function's job is to request access to the user's webcam, 
initialize the output <img> to a default state, 
and to establish the event listeners needed to receive each 
frame of video from the camera and react when the button is 
clicked to capture an image.
*/

function startup() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    // console.log("mobile device");
  }else{
    // false for not mobile device
    // console.log("not mobile device");
  }

  // If landscape
  if(innerWidth>=innerHeight){
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

  
  video = document.querySelector('#video');
  
  canvas = document.querySelector('#canvas');
  photo = document.querySelector('#photo');
  startbutton = document.querySelector('#startbutton');

  // height = video.videoHeight / (video.videoWidth/width);
  photo.setAttribute('width', `${width}px`);
  photo.setAttribute('height', `${height}px`);
  video.setAttribute('width', `${width}px`);
  video.setAttribute('height', `${height}px`);
  
  canvas.setAttribute('width', `${width}px`);
  canvas.setAttribute('height', `${height}px`);
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
    photo.setAttribute('height', 'auto');
    // console.log('Video can start, but not sure it will play through.');
    if (!streaming) {    
      // video.setAttribute('width', width);
      // video.setAttribute('height', height);
      // canvas.setAttribute('width', width);
      // canvas.setAttribute('height', height);
      /*Finally, we set the streaming variable to true to prevent us from inadvertently running this setup code again. */
      streaming = true;
      console.log("inside of canplay")
      // video.setAttribute('height', 'auto');
      // photo.setAttribute('height', 'auto');
    }
  }, false);

  video.addEventListener('canplaythrough', function(event){
    console.log("7. canplaythrough")
  })

  startbutton.addEventListener('click', function(event){
    takepicture();
    event.preventDefault();
  }, false);
  
  clearphoto();
}

// Fill the photo with an indication that none has been
// captured.

function clearphoto() {
  var context = canvas.getContext('2d');
  context.fillStyle = 'red';
  // context.fillRect(0, 0, 900, 900);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}


function takepicture() {
  var context = canvas.getContext('2d');
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
  
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  } else {
    clearphoto();
  }
}

// Set up our event listener to run the startup process
// once loading is complete.


// window.addEventListener('load', startup, false);
// ------------------------------------------------------------------------------------------------------------
// (function() {
//   // The width and height of the captured photo. We will set the
//   // width to the value defined here, but the height will be
//   // calculated based on the aspect ratio of the input stream.

//   var width = 320;    // We will scale the photo width to this
//   var height = 0;     // This will be computed based on the input stream

//   // |streaming| indicates whether or not we're currently streaming
//   // video from the camera. Obviously, we start at false.

//   var streaming = false;

//   // The various HTML elements we need to configure or control. These
//   // will be set by the startup() function.

//   var video = null;
//   var canvas = null;
//   var photo = null;
//   var startbutton = null;

//   function startup() {
//     video = document.getElementById('video');
//     canvas = document.getElementById('canvas');
//     photo = document.getElementById('photo');
//     startbutton = document.getElementById('startbutton');

//     navigator.mediaDevices.getUserMedia({video: true, audio: false})
//     .then(function(stream) {
//       video.srcObject = stream;
//       video.play();
//     })
//     .catch(function(err) {
//       console.log("An error occurred: " + err);
//     });

//     video.addEventListener('canplay', function(ev){
//       if (!streaming) {
//         height = video.videoHeight / (video.videoWidth/width);
      
//         // Firefox currently has a bug where the height can't be read from
//         // the video, so we will make assumptions if this happens.
      
//         if (isNaN(height)) {
//           height = width / (4/3);
//         }
      
//         video.setAttribute('width', width);
//         video.setAttribute('height', height);
//         canvas.setAttribute('width', width);
//         canvas.setAttribute('height', height);
//         streaming = true;
//       }
//     }, false);

//     startbutton.addEventListener('click', function(ev){
//       takepicture();
//       ev.preventDefault();
//     }, false);
    
//     clearphoto();
//   }

//   // Fill the photo with an indication that none has been
//   // captured.

//   function clearphoto() {
//     var context = canvas.getContext('2d');
//     context.fillStyle = "#AAA";
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     var data = canvas.toDataURL('image/png');
//     photo.setAttribute('src', data);
//   }
  
//   // Capture a photo by fetching the current contents of the video
//   // and drawing it into a canvas, then converting that to a PNG
//   // format data URL. By drawing it on an offscreen canvas and then
//   // drawing that to the screen, we can change its size and/or apply
//   // other changes before drawing it.

//   function takepicture() {
//     var context = canvas.getContext('2d');
//     if (width && height) {
//       canvas.width = width;
//       canvas.height = height;
//       context.drawImage(video, 0, 0, width, height);
    
//       var data = canvas.toDataURL('image/png');
//       photo.setAttribute('src', data);
//     } else {
//       clearphoto();
//     }
//   }

//   // Set up our event listener to run the startup process
//   // once loading is complete.
//   window.addEventListener('load', startup, false);
// })();