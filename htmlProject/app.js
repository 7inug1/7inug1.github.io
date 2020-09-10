// 7inug1.github.io

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('/htmlProject/sw.js', { scope: '/htmlProject/' })
  .then(function(register) {
    console.log('Registration successful, scope is:', registration.scope);
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