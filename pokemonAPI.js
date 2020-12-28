// <Pokemon List> Variables - left-hand side
let pokemonSubheadingCounter = document.getElementById('pokemonSubheadingCounter');
let pokemonButton;
let nextPageResult = '';
let endOfScroll = false;

// <Pokemon Details> Variables - right-hand side
let pokemonListContainer = document.getElementById('pokemonListContainer');
let pokemonDetailsCardTitle = document.getElementById('pokemonDetailsCardTitle');
let pokemonDetailsCardSprite = document.getElementById('pokemonDetailsCardSprite');
let pokemonDetailsCardInfo = document.getElementById('pokemonDetailsCardInfo');

// <Function Calls>
createPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`);


function createPokemonList(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    pokemonListContainer.onscroll = checkEndOfScroll; // When scrolling starts from the user
    nextPageResult = data.next;
    const pokemonsOfEachPage = data.results; 
    //------------------------------------------------------------------------------------------------------------------------
    let offsetRegex = url.search("offset=");
    let limitRegex = url.search("limit=");

    // let end = url.indexOf('&')
    let substring = url.substring(Number(offsetRegex+7), url.indexOf('&'));
    let offset = Number(substring);
    let limit = Number(url.slice((limitRegex+6)));
    
    if(pokemonSubheadingCounter.hasChildNodes()){
      // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
      while (pokemonSubheadingCounter.firstChild) {
        pokemonSubheadingCounter.removeChild(pokemonSubheadingCounter.lastChild);
      }
    }
    
    let counter = document.createTextNode("(" + (offset+limit) + "/" + data.count + ")");
    counter.className = "counter";
    pokemonSubheadingCounter.appendChild(counter);
    //------------------------------------------------------------------------------------------------------------------------

    for(let i = 0; i < pokemonsOfEachPage.length; i++){
      pokemonButton = document.createElement("button"); // create button element
      pokemonButton.textContent = pokemonsOfEachPage[i].name; // put "name" as the button content
      pokemonButton.className = "pokemonButton"; // change to materialUI button

      pokemonButton.addEventListener('click', function() {
        getPokemonInformation(pokemonsOfEachPage[i].url)
      }, false);

      let br = document.createElement('br');
      pokemonButton.appendChild(br);
      pokemonListContainer.appendChild(pokemonButton);
      pokemonListContainer.appendChild(br);
    }
  })
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
function checkEndOfScroll(event){
  let scrollHeight = event.target.scrollHeight;
  let scrollTop = event.target.scrollTop;
  let clientHeight = event.target.clientHeight;
  console.log("scrollHeight - scrollTop: " + (scrollHeight - scrollTop));
  console.log("clientHeight: " + clientHeight);
  if(endOfScroll == false && ((scrollHeight - scrollTop) <= clientHeight)){
    endOfScroll = true;
    createPokemonList(nextPageResult);
    endOfScroll = false;
    console.log(endOfScroll);
  }
}

function getPokemonInformation(url){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let pokemonId;
    let pokemonName;
    let pokemonSpecies;
    let pokemonTypes;
    let pokemonStats;
    let pokemonBaseExperience;
    let pokemonAbilities;
    
    if(pokemonDetailsCardInfo.hasChildNodes()){
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

function getPokemonFrontSprites(dataSprites){
  while (pokemonDetailsCardSprite.firstChild) {
    pokemonDetailsCardSprite.removeChild(pokemonDetailsCardSprite.lastChild);
  }
  let pokemonSprite = document.createElement('img');
  pokemonSprite.width = "100"; 
  pokemonSprite.height = "100"; 
  if((dataSprites.front_default)!=null){
    pokemonSprite.src = dataSprites.front_default;
  }else{
    pokemonSprite.className = "questionMarkImage";
    // img src: https://www.pinpng.com/picture/oJhiib_question-mark-bigger-question-mark-pixel-art-hd/
    pokemonSprite.src = "./question_mark_image.png"; 
    pokemonSprite.width = '40';
    pokemonSprite.height = '80';
  }
  pokemonDetailsCardSprite.appendChild(pokemonSprite);
}

function getPokemonId(dataId){
  let strongElement = document.createElement('strong');
  pokemonId = document.createTextNode(`ID: ${dataId}`); 
  strongElement.appendChild(pokemonId);
  pokemonDetailsCardInfo.appendChild(strongElement);
  
  let hr = document.createElement('hr');
  hr.className = "hr";
  pokemonDetailsCardInfo.appendChild(hr);
}

function getPokemonName(dataName){
  while (pokemonDetailsCardTitle.firstChild) {
    pokemonDetailsCardTitle.removeChild(pokemonDetailsCardTitle.lastChild);
  }
  pokemonName = document.createTextNode(dataName); 
  pokemonDetailsCardTitle.appendChild(pokemonName);
}

function getPokemonTypes(dataTypes){
  for(let i = 0; i < dataTypes.length; i++){
    pokemonTypes = document.createTextNode(`Type: ${dataTypes[i].type.name}`); 
    pokemonDetailsCardInfo.appendChild(pokemonTypes);
  }
}

function getPokemonBaseExperience(dataBaseExperience){
  pokemonBaseExperience = document.createTextNode(`Base Experience: ${dataBaseExperience}`); 
  pokemonDetailsCardInfo.appendChild(document.createElement("br"));
  pokemonDetailsCardInfo.appendChild(pokemonBaseExperience);
}

function getPokemonAbilities(dataAbilities){
  for(let i = 0; i < dataAbilities.length; i++){
    pokemonAbilities = document.createTextNode(`Ability: ${dataAbilities[i].ability.name}`); 
    pokemonDetailsCardInfo.appendChild(document.createElement("br"));
    pokemonDetailsCardInfo.appendChild(pokemonAbilities);
  }
}