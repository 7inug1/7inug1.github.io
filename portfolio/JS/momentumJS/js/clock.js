const clock = document.querySelector('.clock');
const clock_hours = document.querySelector('.clock .hours');
const clock_minutes = document.querySelector('.clock .minutes');
const clock_seconds = document.querySelector('.clock .seconds');

getClock();
setInterval(getClock, 1000);

function getClock() {
  const date = new Date();
  // The padStart() method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of the current string.
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  clock_hours.innerText = `${hours}`;
  clock_minutes.innerText = `${minutes}`;
  clock_seconds.innerText = `${seconds}`;
}
