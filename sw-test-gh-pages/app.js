

// 1. Register your worker
// make sure service workers are supported 
// before trying to register one.

// This registers a service worker, which runs in a 
// worker context, and therefore has no DOM access.
if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' })
  .then(function(registration) {
    console.log('Service Worker is registered', registration);
    if(registration.installing) {
      console.log('Service worker installing');
    } else if(registration.waiting) {
      console.log('Service worker installed');
    } else if(registration.active) {
      console.log('Service worker active');
    }
    
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}


// function for loading each image via XHR

function imgLoad(imgJSON) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', imgJSON.url);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = imgJSON;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

var imgSection = document.querySelector('section');

window.onload = function() {

  // load each set of image, alt text, name and caption
  for(var i = 0; i<=Gallery.images.length-1; i++) {
    imgLoad(Gallery.images[i]).then(function(arrayResponse) {

      var myImage = document.createElement('img');
      var myFigure = document.createElement('figure');
      // var myCaption = document.createElement('caption');
      var imageURL = window.URL.createObjectURL(arrayResponse[0]);

      myImage.src = imageURL;
      myImage.setAttribute('alt', arrayResponse[1].alt);
      // myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>: Taken by ' + arrayResponse[1].credit;

      imgSection.appendChild(myFigure);
      myFigure.appendChild(myImage);
      // myFigure.appendChild(myCaption);

    }, function(Error) {
      console.log(Error);
    });
  }
};
