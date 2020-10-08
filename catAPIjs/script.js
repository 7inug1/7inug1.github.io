'use strict';

const API_KEY = "c2478ccf-da9c-49cb-9abf-8b41796e6f44";
let hello = document.getElementById('hello');
// https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc

getCatImage();

function getCatImage(){
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc`
  ).then(function (response) {
    return response.json()
  }).then(function (json) {
    let width = json.width;
    hello.innerHTML = width;
  });
}

// function getWeather(lat, lng) {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
//   ).then(function (response) {
//     return response.json()
//   }).then(function (json) {
//     const temperature = json.main.temp;
//     const place = json.name;
//     weather.innerText = `${temperature} @ ${place}`;
//   });
// }