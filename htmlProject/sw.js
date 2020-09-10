// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
  // https://github.com/mdn/7inug1.github.io
  // https://mdn.github.io/7inug1.github.io/
// https://css-tricks.com/serviceworker-for-offline/
  // https://github.com/chriscoyier/Simple-Offline-Site
// https://developers.google.com/web/fundamentals/primers/service-workers
// https://developers.google.com/web/fundamentals/codelabs/offline#build_the_starter_app

// https://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http
// https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9

self.addEventListener('install', function(event) {
  // this ensures that the service worker 
  // will not install until the code inside 
  // waitUntil() has successfully occurred.

  event.waitUntil(
    caches.open('v1').then(function(cache) {
      // takes an array of origin-relative URLs 
      // to all the resources you want to cache.
      return cache.addAll([
        './index.html',
        './7inug1.github.io/',
        './7inug1.github.io/index.html',
        './7inug1.github.io/letter.html',
        './7inug1.github.io/style.css',
        './7inug1.github.io/portfolio.css',
        './7inug1.github.io/app.js',
        './7inug1.github.io/canvas.js',
        './7inug1.github.io/camera.js',
        './7inug1.github.io/sw.js',
        './7inug1.github.io/onlineOffline.js'
      ]);
    })
  );
});




// With fetch event, you tell servie workers to do something
// with the cached content. 
self.addEventListener('fetch', function(event) {
  // "caches.match(event.request)" allows us to match each
  // resource requested from the network with the equivalent
  // resource available in the cache, if there is a matching
  // one available. 
  
  // call respondWith() on the event to hijack HTTP responses
  // and update them with your own magic. 
  event.respondWith(caches.match(event.request)
  .then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } 
    
    else {
      return fetch(event.request)
      .then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1')
        .then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/7inug1.github.io/myLittleVader.jpg');
      });
    }
  }));
});