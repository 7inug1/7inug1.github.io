const navigationWrapper = document.querySelector('.navigation-wrapper');
const hamburgerMenu = document.querySelector('.hamburger-icon');
const CLASSNAME_ACTIVE = 'active';
const CLASSNAME_HIDDEN = 'hidden';
let navigationIsOpen = false;
let subnavigationIsOpen = false;
const navigation = document.querySelector('.navigation');
const subnavigation = document.querySelector('.subnavigation');
hamburgerMenu.addEventListener('click', () => {
  if (!navigationIsOpen) {
    // toggleNavigation();
    navigation.style.display = 'block';
    navigationIsOpen = true;
    console.log(navigationIsOpen, 'navigation');

    navigation.addEventListener('mouseover', event => {
      console.log(event.target);
      console.log(event.target.className === 'body');
      if (event.target.className === 'body') {
        const listButton = event.target.closest('button');
        // if (event.target === 'button') {
        listButton.classList.add('current');
        // toggleSubnavigation();
        subnavigation.style.display = 'block';
        subnavigationIsOpen = true;
        console.log(subnavigationIsOpen, 'subnavigation');

        subnavigation.addEventListener('mouseover', event => {
          console.log('stay');
          subnavigation.style.display = 'block';
        });

        navigation.addEventListener('mouseout', event => {
          const listButton = event.target.closest('button');
          listButton.classList.remove('current');
          // toggleSubnavigation();
          subnavigation.style.display = 'none';
          subnavigationIsOpen = false;
          console.log(subnavigationIsOpen, 'subnavigation');
        });
      }
    });
  } else {
    // toggleNavigation();
    navigation.style.display = 'none';
    navigationIsOpen = false;
    console.log(navigationIsOpen, 'navigation');
  }
});

function toggleNavigation() {
  if (!navigationIsOpen) {
    navigation.style.display = 'block';
    navigationIsOpen = true;
  } else {
    navigation.style.display = 'none';
    navigationIsOpen = false;
  }
}

function toggleSubnavigation() {
  if (!subnavigationIsOpen) {
    subnavigation.style.display = 'block';
    subnavigationIsOpen = true;
  } else {
    subnavigation.style.display = 'none';
    subnavigationIsOpen = false;
  }
}
