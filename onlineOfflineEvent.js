let onlineOfflineLog = document.getElementById('onlineOfflineLog');
let onlineOfflineStatus = document.getElementById('onlineOfflineStatus');
let statusBar = document.getElementById('statusBar');

window.addEventListener('online', showOnlineOfflineStatus);
window.addEventListener('offline', showOnlineOfflineStatus);

showOnlineOfflineStatus();

function showOnlineOfflineStatus() {
    let status = navigator.onLine ? "Online" : "Offline";
    onlineOfflineStatus.innerHTML = status;

    if(status == "Online") {statusBar.style.backgroundColor = "rgb(26, 138, 63)"} //green
    if(status == "Offline") {statusBar.style.backgroundColor = "rgba(163, 0, 0, 0.959)"} //red
}


