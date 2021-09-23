const loginForm = document.querySelector('.login-form');
const loginInput = document.querySelector('.login-form input');
const loginButton = document.querySelector('.login-button');

const greeting = document.querySelector('.greeting');
const CLASSNAME_HIDDEN = 'hidden';

const KEY_USERNAME = 'username';
const savedUsername = localStorage.getItem(KEY_USERNAME);

loginButton.addEventListener('click', onLoginButtonClick);

if (savedUsername === null) {
  loginForm.classList.remove(CLASSNAME_HIDDEN);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}

function onLoginButtonClick() {
  if (loginInput.required === true) {
    onLoginSubmit();
  }
}

function onLoginSubmit() {
  event.preventDefault();
  loginForm.classList.add(CLASSNAME_HIDDEN);
  const username = loginInput.value;
  localStorage.setItem(KEY_USERNAME, loginInput.value);
  paintGreetings(localStorage.getItem(KEY_USERNAME));
  loginInput.value = '';
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}!`;
  greeting.classList.remove(CLASSNAME_HIDDEN);
}
