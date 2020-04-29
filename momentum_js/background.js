const body = document.querySelector("body");

const IMAGE_NUMBER = 3;

initialize();

function paintImage(imageNumber) {
  const image = new Image();
  image.src = `images/${imageNumber}.jpg`;
  image.classList.add("backgroundImage");
  body.prepend(image);
}

function generateRandomNumber() {
  const number = Math.floor(Math.random() * IMAGE_NUMBER) + 1;
  return number;
}

function initialize() {
  const randomNumber = generateRandomNumber();
  paintImage(randomNumber);
}

// function handleImgLoad() {
//   console.log("finished loading");
// }
