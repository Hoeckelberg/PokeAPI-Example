//toggle = true;
//const pokeList = [];
//let counter = 0;
URL = "https://pokeapi.co/api/v2/pokemon";

const getPokemon = () => {
  getPokemonData("/1");
};

const getPrevPokemon = () => {
  let pokeId = Number(document.getElementById("searchBar").value);
  if (pokeId > 1) {
    pokeId--;
    console.log(pokeId);
    getPokemonData("/" + pokeId);
  }
};

const getNextPokemon = () => {
  let pokeId = Number(document.getElementById("searchBar").value);
  if (pokeId < 150 && pokeId > 0) {
    pokeId++;
    console.log(pokeId);
    getPokemonData("/" + pokeId);
  }
};

const getPokemonById = () => {
  let pokeId = Number(document.getElementById("searchBar").value);
  let pokeIdRGEX = /d*/;
  console.log(pokeId);
  if (pokeId < 150 && pokeId > 0 && pokeIdRGEX.test(pokeId)) {
    getPokemonData("/" + pokeId);
  } else alert("Please enter a valid number between 1 and 150");
};

const getPokemonData = (url) => {
  fetch(URL + url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createElements(data);
      setPokemonStatBarApperance();
    });
  };
  const createElements = (data) => {
    pokeImg = document.getElementById("pokeImg");
    pokeImg.src = data.sprites.other["official-artwork"].front_default;
    pokeImg.alt = data.name;
    pokeName = document.getElementById("pokeName");
    pokeName.innerHTML = data.name;
    pokeId = document.getElementById("pokeId");
    pokeId.innerHTML = "id: " + data.id;
    pokeHeight = document.getElementById("pokeHeight");
    pokeHeight.innerHTML = "height: " + data.height;
    pokeWeight = document.getElementById("pokeWeight");
    pokeWeight.innerHTML = "weight: " + data.weight;
    pokeType = document.getElementById("pokeType");
    pokeType.innerHTML = "type: " + data.types[0].type.name;
    if (data.types.length > 1) {
      pokeType2 = document.getElementById("pokeType2");
      pokeType2.innerHTML = "type: " + data.types[1].type.name;
    } else {
      pokeType2 = document.getElementById("pokeType2");
      pokeType2.innerHTML = "type2: " + "none";
    }
    pokeHp = document.getElementById("pokeHp");
    pokeHp.innerHTML = "hp: " + data.stats[0].base_stat;
    pokeAtk = document.getElementById("pokeAtk");
    pokeAtk.innerHTML = "attack: " + data.stats[1].base_stat;
    pokeDef = document.getElementById("pokeDef");
    pokeDef.innerHTML = "defense: " + data.stats[2].base_stat;

    //set searchBar value to current pokemon id
    searchBar = document.getElementById("searchBar");
    searchBar.value = data.id;
    // change background color based on pokemon type
    if (data.types.length > 1) {
      // if pokemon has only one type
      setPokemonBackground(data.types[0].type.name, data.types[1].type.name);
    } else {
      setPokemonBackground(data.types[0].type.name, data.types[0].type.name);
    }
  };
// function has to be updated
const setPokemonBackground = (type, type2) => {
  // change background color to linear gradient based on two pokemon types
  pokeTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  pokeColors = [
    "#A8A878",
    "#F08030",
    "#6890F0",
    "#F8D030",
    "#78C850",
    "#98D8D8",
    "#C03028",
    "#A040A0",
    "#E0C068",
    "#A890F0",
    "#F85888",
    "#A8B820",
    "#B8A038",
    "#705898",
    "#7038F8",
    "#705848",
    "#B8B8D0",
    "#EE99AC",
  ];

  var pokeTypeColor = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  // get index of type in pokeTypes array
  let typeIndex = pokeTypes.indexOf(type);
  let type2Index = pokeTypes.indexOf(type2);

  // get color of type from pokeColors array
  let typeColor = pokeColors[typeIndex];
  let type2Color = pokeColors[type2Index];

  // set background color to linear gradient based on type
  document.body.style.background =
    "linear-gradient(to right, " + typeColor +", " + type2Color +")";
  ptype = document.getElementById("pokeType");
  ptype.style.backgroundColor = typeColor;
  ptype.style.color = "white";
  ptype2 = document.getElementById("pokeType2");
  // if pokemon has only one type set type2 color to black
  if (type2 === type) {
    ptype2.style.backgroundColor = "";
  } else {
    ptype2.style.backgroundColor = type2Color;
    ptype2.style.color = "white";
  }
}

const setPokemonStatBarApperance = () => {
  // set stat bar apperance based on pokemon stats
  let pokeHp = document.getElementById("pokeHp");
  let pokeAtk = document.getElementById("pokeAtk");
  let pokeDef = document.getElementById("pokeDef");
  let pokeHpBar = document.getElementById("hp-bar");
  let pokeAtkBar = document.getElementById("atk-bar");
  let pokeDefBar = document.getElementById("def-bar");

  // set hp bar width based on pokemon hp
  pokeHpBar.style.width = pokeHp.innerHTML.slice(4)/255*100 + "%";
  // set atk bar width based on pokemon atk
  pokeAtkBar.style.width = pokeAtk.innerHTML.slice(8)/190*100 + "%";
  // set def bar width based on pokemon def
  console.log(pokeDef.innerHTML.slice(9));
  pokeDefBar.style.width = pokeDef.innerHTML.slice(9)/230*100 + "%";
}
  window.onLoad = getPokemon();
