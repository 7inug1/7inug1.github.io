// 'use strict';
// <Pokemon List> Variables - left-hand side
const pokemonSubheadingCounter = document.querySelector(
  '#pokemonSubheadingCounter'
);
let pokemonButton;
let nextPageResult = '';
let endOfScroll = false;

// <Pokemon Details> Variables - right-hand side
const pokemonListContainer = document.querySelector('#pokemonListContainer');
const pokemonDetailsCardTitle = document.querySelector(
  '#pokemonDetailsCardTitle'
);
const pokemonDetailsCardSprite = document.querySelector(
  '#pokemonDetailsCardSprite'
);
const pokemonDetailsCardInfo = document.querySelector(
  '#pokemonDetailsCardInfo'
);

// <Function Calls>
createPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`);

function createPokemonList(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pokemonListContainer.onscroll = checkEndOfScroll; // When scrolling starts from the user
      nextPageResult = data.next;
      const pokemonsOfEachPage = data.results;
      const offsetRegex = url.search('offset=');
      const limitRegex = url.search('limit=');
      const substring = url.substring(
        Number(offsetRegex + 7),
        url.indexOf('&')
      );
      const offset = Number(substring);
      const limit = Number(url.slice(limitRegex + 6));

      if (pokemonSubheadingCounter.hasChildNodes()) {
        // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        while (pokemonSubheadingCounter.firstChild) {
          pokemonSubheadingCounter.removeChild(
            pokemonSubheadingCounter.lastChild
          );
        }
      }

      const counter = document.createTextNode(
        '(' + (offset + limit) + '/' + data.count + ')'
      );
      counter.className = 'counter';
      pokemonSubheadingCounter.appendChild(counter);

      pokemonsOfEachPage.forEach((pokemonOfEachPage) => {
        pokemonButton = document.createElement('button'); // create button element
        pokemonButton.textContent = pokemonOfEachPage.name; // put "name" as the button content
        pokemonButton.className = 'pokemonButton'; // change to materialUI button
        pokemonButton.addEventListener(
          'click',
          () => {
            getPokemonInformation(pokemonOfEachPage.url);
          },
          false
        );
        const br = document.createElement('br');
        pokemonButton.appendChild(br);
        pokemonListContainer.appendChild(pokemonButton);
        pokemonListContainer.appendChild(br);
      });
    });
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
function checkEndOfScroll(event) {
  const scrollHeight = event.target.scrollHeight;
  const scrollTop = event.target.scrollTop;
  const clientHeight = event.target.clientHeight;
  console.log('scrollHeight - scrollTop: ' + (scrollHeight - scrollTop));
  console.log('clientHeight: ' + clientHeight);
  if (endOfScroll == false && scrollHeight - scrollTop <= clientHeight) {
    endOfScroll = true;
    createPokemonList(nextPageResult);
    endOfScroll = false;
    console.log(endOfScroll);
  }
}

function getPokemonInformation(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let pokemonId;
      let pokemonName;
      let pokemonSpecies;
      let pokemonTypes;
      let pokemonStats;
      let pokemonBaseExperience;
      let pokemonAbilities;

      if (pokemonDetailsCardInfo.hasChildNodes()) {
        // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        while (pokemonDetailsCardInfo.firstChild) {
          pokemonDetailsCardInfo.removeChild(pokemonDetailsCardInfo.lastChild);
        }
      }

      getPokemonFrontSprites(data.sprites);
      getPokemonId(data.id);
      getPokemonName(data.name);
      getPokemonTypes(data.types);
      getPokemonBaseExperience(data.base_experience);
      getPokemonAbilities(data.abilities);
    });
}

function getPokemonFrontSprites(dataSprites) {
  while (pokemonDetailsCardSprite.firstChild) {
    pokemonDetailsCardSprite.removeChild(pokemonDetailsCardSprite.lastChild);
  }
  const pokemonSprite = document.createElement('img');
  pokemonSprite.width = '100';
  pokemonSprite.height = '100';
  if (dataSprites.front_default != null) {
    pokemonSprite.src = dataSprites.front_default;
  } else {
    pokemonSprite.className = 'questionMarkImage';
    // img src: https://www.pinpng.com/picture/oJhiib_question-mark-bigger-question-mark-pixel-art-hd/
    pokemonSprite.src = './question_mark_image.png';
    pokemonSprite.width = '40';
    pokemonSprite.height = '80';
  }
  pokemonDetailsCardSprite.appendChild(pokemonSprite);
}

function getPokemonId(dataId) {
  const strongElement = document.createElement('strong');
  pokemonId = document.createTextNode(`ID: ${dataId}`);
  strongElement.appendChild(pokemonId);
  pokemonDetailsCardInfo.appendChild(strongElement);

  const hr = document.createElement('hr');
  hr.className = 'hr';
  pokemonDetailsCardInfo.appendChild(hr);
}

function getPokemonName(dataName) {
  while (pokemonDetailsCardTitle.firstChild) {
    pokemonDetailsCardTitle.removeChild(pokemonDetailsCardTitle.lastChild);
  }
  pokemonName = document.createTextNode(dataName);
  pokemonDetailsCardTitle.appendChild(pokemonName);
}

function getPokemonTypes(dataTypes) {
  dataTypes.forEach((datatype) => {
    pokemonTypes = document.createTextNode(`Type: ${datatype.type.name}`);
    pokemonDetailsCardInfo.appendChild(pokemonTypes);
  });
}

function getPokemonBaseExperience(dataBaseExperience) {
  pokemonBaseExperience = document.createTextNode(
    `Base Experience: ${dataBaseExperience}`
  );
  pokemonDetailsCardInfo.appendChild(document.createElement('br'));
  pokemonDetailsCardInfo.appendChild(pokemonBaseExperience);
}

function getPokemonAbilities(dataAbilities) {
  dataAbilities.forEach((dataAbility) => {
    pokemonAbilities = document.createTextNode(
      `Ability: ${dataAbility.ability.name}`
    );
    pokemonDetailsCardInfo.appendChild(document.createElement('br'));
    pokemonDetailsCardInfo.appendChild(pokemonAbilities);
  });
}
