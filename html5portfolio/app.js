// 'app.js' goes along with 'sw.js' to use service worker. 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' })
    .then(registration => {
      console.log('Service Worker is registered', registration);
      if(registration.installing) {
        console.log('Service worker installing');
      } else if(registration.waiting) {
        console.log('Service worker installed');
      } else if(registration.active) {
        console.log('Service worker active');
      }
    })
    .catch(err => {
      console.error('Registration failed:', err);
    });
  });
}