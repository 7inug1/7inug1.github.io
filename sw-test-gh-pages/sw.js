// 2. Install and activate: populate your cache
// After your service worker is registered, the browser 
// will attempt to install then activate the 
// service worker for your page/site.

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
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
});
// After a successful installation, the service worker activates. 
// Now you’ve got your site assets cached


//4. 
// With fetch event, you tell servie workers to do something
// with the cached content. 
self.addEventListener('fetch', function(event) {
  // This is to hijack our HTTP responses and update them as we like
  event.respondWith(
    //This allows us to match each resource requested
    //from the network with the equivalent resource available
    //in the cache, if there is a matching one.
    caches.match(event.request)
  
  // checking whether a response has previously been cached. 
  // If so, the cached response is returned. If not the request is passed along to the network.
  
  // 1.
  // call respondWith() on the event to hijack HTTP responses
  // and update them with your own magic. 
  // "event.respondWith() method" allows us to provide a response to this fetch.

  //2.
  // "caches.match(event.request)" allows us to match each
  // resource requested from the network with the equivalent
  // resource available in the cache, if there is a matching
  // one available. 

  .then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    
    // 1.If the response is anything else than undefined, you trust what it is and just return it.
    // If the resources are not in the cache, they are requested from the network.
  
    //?
    if (response !== undefined) {
      return response;
    } 
    
    else {
      //2.
      // This is if a match wasn't found in the cache.
      // You tell the browser to simply fetch the default network request
      // for that resource, to get the new resource from the network
      // if it is available
      
      // THIS RETURNS A PROMISE
      return fetch(event.request)
      .then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        // We respond to the resolved promise by running
        // a function that grabs our cache using 
        // caches.open('v1') ->this also returns a promise
        caches.open('v1')
        .then(function (cache) {
          // this is used to add resource to the cache 
          // when the promise is resolved

          // clone is put in the cache and 
          // og response is returned to the browser
          // to be given to the page that called it.
          cache.put(event.request, responseClone);
        });
        return response;

      // When the request doesn't match anything in the cache
      // and the network is not available

      // This is what the user gets at least
      }).catch(function () {
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
      });
    }
  }));
});
