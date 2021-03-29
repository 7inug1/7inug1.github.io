function fetchDataFromStoage(key) {
  // document.cookie
  return sessionStorage.getItem(key);
}

function saveDataToStorage(key, value) {
  return sessionStorage.setItem(key, value);
}

export { fetchDataFromStoage, saveDataToStorage };
