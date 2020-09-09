// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
  // https://github.com/mdn/sw-test
  // https://mdn.github.io/sw-test/
// https://css-tricks.com/serviceworker-for-offline/
  // https://github.com/chriscoyier/Simple-Offline-Site
// https://developers.google.com/web/fundamentals/primers/service-workers
// https://developers.google.com/web/fundamentals/codelabs/offline#build_the_starter_app

// https://stackoverflow.com/questions/34160509/options-for-testing-service-workers-via-http
// https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' })
  .then(function(register) {
    if(register.installing) {
      console.log('Service worker installing');
    } else if(register.waiting) {
      console.log('Service worker installed');
    } else if(register.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}