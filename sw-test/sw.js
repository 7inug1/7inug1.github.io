let responseClone;

self.addEventListener('install', function(event) {
  // this ensures that the service worker 
  // will not install until the code inside 
  // waitUntil() has successfully occurred.

  event.waitUntil(
    caches.open('v1').then(function(cache) {
      // takes an array of origin-relative URLs 
      // to all the resources you want to cache.
      return cache.addAll([
        '/sw-test/',
        '/sw-test/app.js',
        '/sw-test/camera.js',
        '/sw-test/canvas.js',
        '/sw-test/index.html',
        '/sw-test/onlineOfflineEvent.js',
        '/sw-test/style.css',
        '/sw-test/sw.js'
      ]);
    })
  );
});





self.addEventListener('fetch', function(event) {

  

  event.respondWith(caches.match(event.request)
  .then(function(response) {


    if (response !== undefined) {
      return response;
    } 
    
    else {
      return fetch(event.request)
      .then(function (response) {

        responseClone = response.clone();
        
        caches.open('v1')
        .then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return response;
      });
    }
  }));
});