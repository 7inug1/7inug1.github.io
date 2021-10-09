const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-form input');
const loginButton = document.querySelector('.login-button');

const login = document.querySelector('.login');
const mainContentContainer = document.querySelector('.main-content-container');

const CLASSNAME_HIDDEN = 'hidden';
const KEY_USERNAME = 'username';
const savedUsername = localStorage.getItem(KEY_USERNAME);

if (savedUsername === null) {
  // not logged in
  loginForm.classList.remove(CLASSNAME_HIDDEN);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  // logged in
  paintGreetings(savedUsername);
}

function onLoginSubmit(event) {
  const username = loginInput.value;
  event.preventDefault();
  localStorage.setItem(KEY_USERNAME, loginInput.value);
  loginForm.classList.add(CLASSNAME_HIDDEN);
  paintGreetings(username);
  loginInput.value = '';
}

function paintGreetings(username) {
  login.innerText = `Hello ${username}!`;
  mainContentContainer.classList.remove(CLASSNAME_HIDDEN);
}
