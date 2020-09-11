self.addEventListener('install', function(event) {
  // this ensures that the service worker 
  // will not install until the code inside 
  // waitUntil() has successfully occurred.

  event.waitUntil(
    caches.open('v1').then(function(cache) {
      // takes an array of origin-relative URLs 
      // to all the resources you want to cache.
      return cache.addAll([
        '/7inug1.github.io/',
        '/7inug1.github.io/app.js',
        '/7inug1.github.io/camera.js',
        '/7inug1.github.io/canvas.js',
        '/7inug1.github.io/letter.html',
        '/7inug1.github.io/myLittleVader.jpg',
        '/7inug1.github.io/onlineOffline.js',
        '/7inug1.github.io/style.css',
        '/7inug1.github.io/sw.js'


        
        // '/7inug1.github.io/index.html',
        // '/7inug1.github.io/letter.html',
        // '/7inug1.github.io/style.css',
        // '/7inug1.github.io/portfolio.css',
        // '/7inug1.github.io/app.js',
        // '/7inug1.github.io/canvas.js',
        // '/7inug1.github.io/camera.js',
        // '/7inug1.github.io/sw.js',
        // '/7inug1.github.io/onlineOffline.js'
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