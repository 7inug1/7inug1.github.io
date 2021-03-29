'use strict';

const onlineOfflineStatus = document.querySelector('#onlineOfflineStatus');
const statusBar = document.querySelector('.statusBar');

window.addEventListener('online', showOnlineOfflineStatus);
window.addEventListener('offline', showOnlineOfflineStatus);

showOnlineOfflineStatus();

function showOnlineOfflineStatus() {
  let status = navigator.onLine ? '🟢 Online' : '🔴 Offline';
  onlineOfflineStatus.innerHTML = status;
}
