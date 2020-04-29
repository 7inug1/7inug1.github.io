const form = document.querySelector(".js-form");
const input = document.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const USER_LOCALSTORAGE = "currentUser";
const SHOWING_CLASSNAME = "showing";

function initialize() {
  loadName();
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LOCALSTORAGE);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function askForName() {
  form.classList.add(SHOWING_CLASSNAME);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CLASSNAME);
  greeting.classList.add(SHOWING_CLASSNAME);
  greeting.innerText = `Hello ${text}`;
}

function saveName(text) {
  localStorage.setItem(USER_LOCALSTORAGE, text);
}

function handleSubmit(event) {
  // prevents default behaviour
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
initialize();
