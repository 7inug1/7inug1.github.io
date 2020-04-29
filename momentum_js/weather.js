const weather = document.querySelector(".js-weather");
const COORDINATES = "coords";
const API_KEY = "dabeec5de20d5b7bd7753d1b05573c0d";

initialize();

function initialize() {
  loadCoordinates();
}

function loadCoordinates() {
  const loadedCoordinates = localStorage.getItem(COORDINATES);
  if (loadedCoordinates === null) {
    askForCoordinates();
  } else {
    const parsedCoordinates = JSON.parse(loadedCoordinates);
    getWeather(parsedCoordinates.latitude, parsedCoordinates.longitude);
  }
}

function askForCoordinates() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function handleGeoError() {
  console.log("Can't access geolocation");
}

function handleGeoSuccess(position) {
  // console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordinateObj = {
    latitude,
    longitude
  };
  saveCoordinates(coordinateObj);
  getWeather(latitude, longitude);
}

function saveCoordinates(coordinateObj) {
  localStorage.setItem(COORDINATES, JSON.stringify(coordinateObj));
}

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function (response) {
    return response.json()
  }).then(function (json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}
