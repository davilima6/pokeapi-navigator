'use strict';

// CONSTANTS

const KEYS = {
  api: {
    baseUrl: 'https://pokeapi.co/api/v2',
    paginationLimit: 10,
  },
  entity: {
    evolutionChain: 'evolution-chain',
    pokemonSpecies: 'pokemon-species',
  },
  cache: {
    speciesCount: 'pokeapinav_speciesCount',
    homepageSpecies: 'pokeapinav_homepageSpecies',
  },
  ui: {
    brightColors: ['white', 'pink', 'yellow'],
    language: 'en',
    labels: {
      unknown: '<em>Unknown</em>',
      btnEvolution: 'Show evolution chain',
      btnDetails: 'Show Species Details',
    },
  },
};

// MODELS

class PokemonSpecies {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.dom = document.querySelector(`[data-id="${data.id}"]`);
    this.color = data.color.name;
    this.habitat = data.habitat ? data.habitat.name : null;
    this.growthRate = data.growth_rate.name;
    this.flavorText = data.flavor_text_entries.find(
      item => item.language.name === KEYS.ui.language
    ).flavor_text;
    this.evolvesFromSpecies = data.evolves_from_species
      ? data.evolves_from_species.name
      : null;
    this.evolutionChainId = _extractId(data.evolution_chain.url);
  }
}

class EvolutionChain {
  constructor(data) {
    this.parent = data.chain.species;
    this.evolvesTo = new ChainLink(data.chain);
  }

  *[Symbol.iterator]() {
    let chainLink = this.evolvesTo;
    while (chainLink) {
      yield chainLink.species.name;
      chainLink = chainLink.evolvesTo;
    }
  }

  get length() {
    return [...this].length;
  }
}

class ChainLink {
  constructor(data) {
    this.species = data.species;
    this.evolvesTo = data.evolves_to.length
      ? new ChainLink(data.evolves_to[0])
      : null;
  }
}

// CATCHERS

// Helper: Pokemon Catcher, a wrapper function for Fetch API
// E.g. fetches /api/v2/pokemon-species/?limit=10 or /api/v2/pokemon-species/bulbasaur
const catch_ = async (entity, id, options) => {
  let url = `${KEYS.api.baseUrl}/${entity}/${id && !isNaN(id) ? `${id}/` : ''}`;

  if (options && options instanceof Object && options.constructor === Object) {
    url += `?${Object.keys(options)
      .reduce((prev, option) => prev.concat(`${option}=${options[option]}`), [])
      .join('&')}`;
  }
  try {
    const response = await fetch(url);

    return response.json();
  } catch (e) {
    document.querySelector('.species-main').innerHTML =
      '<p class="error">Sorry, there was an error retrieving data from PokéAPI. Please hunt again later.</p>';
  }
};

// Catcher: Run-once cached function that allows random Species Catching
const catchSpeciesCount = async (entity) => {
  const storedCount = sessionStorage.getItem(KEYS.cache.speciesCount);

  if (storedCount) {
    return storedCount;
  }
  const data = await catch_(KEYS.entity.pokemonSpecies, 'all', { limit: 1 });

  sessionStorage.setItem(KEYS.cache.speciesCount, data.count);
  return data.count;
};

// Catcher: Run-once cached function that provides initial set of Species
const catchSpecies = async () => {
  const storedSpecies = sessionStorage.getItem(KEYS.cache.homepageSpecies);

  if (storedSpecies) {
    return JSON.parse(storedSpecies);
  }
  const count = await catchSpeciesCount(KEYS.entity.pokemonSpecies);
  const data = await catch_(KEYS.entity.pokemonSpecies, 'all', {
    limit: KEYS.api.paginationLimit,
    offset: Math.floor(Math.random() * (count - KEYS.api.paginationLimit))
  });

  sessionStorage.setItem(
    KEYS.cache.homepageSpecies,
    JSON.stringify(data.results)
  );
  return data.results;
};

// Catcher: returns API data as an instance of PokemonSpecies model
// TODO: also cache, for filtering and pagination
const catchSpeciesDetails = async (id) => {
  const data = await catch_(KEYS.entity.pokemonSpecies, id);

  return new PokemonSpecies(data);
}

// Catcher: returns API data as an instance of EvolutionChain model
const catchEvolutionChain = async (id) => {
  const data = await catch_(KEYS.entity.evolutionChain, id);

  return new EvolutionChain(data);
}

// HELPERS

// View Helper: tells if a color is bright
const _isColorBright = color => KEYS.ui.brightColors.indexOf(color) !== -1;

// View Helper: transforms a string by capitalising its first character
const _capitalise = str => str.slice(0, 1).toUpperCase() + str.slice(1);

// Controller/View Helper: extracts ID from a URL returned by API
const _extractId = str =>
  str
    .split('/')
    .slice(-2, -1)
    .pop();

// Controller Helper: clear homepage species and other old keys from cache
const clearCache = () => {
  Object.keys(sessionStorage)
    .filter(key => key !== KEYS.cache.speciesCount)
    .forEach(key => sessionStorage.removeItem(key));
  return true;
};

// RENDERS

// View Helper: renders basic UI cards for 1st phase of Species Catching
const renderSpecies = speciesArr => {
  const speciesEl = document.querySelector('.species-main');
  let innerHTML = '';

  for (const species of speciesArr) {
    const speciesTpl = `
<li class="species-item" data-id="${_extractId(species.url)}">
  <div class="species-main-flipper">
    <div class="species-main-front">
      <div class="species-title" title="${_capitalise(
        species.name
      )}">${_capitalise(species.name)}</div>
      <div class="species-body">
        <div class="center">
          <img src="spinner.svg" width="24" height="24" alt="Loading...">
        </div>
      </div>
      <a href="" onclick="return false" class="btn btn-evolution btn-disabled">${
        KEYS.ui.labels.btnEvolution
      }</a>
    </div>
    <div class="species-main-back"></div>
  </div>
</li>`;
    innerHTML += speciesTpl;
  }
  speciesEl.innerHTML = `<ul class="species-list">${innerHTML}</ul>`;
};

// View Helper: enhances cards with details for 2nd phase of Species Catching
const renderSpeciesBody = pokemonSpecies => {
  const bodyEl = pokemonSpecies.dom.querySelector('.species-body');
  const btnEl = pokemonSpecies.dom.querySelector('.btn-evolution');

  pokemonSpecies.dom.style.background = 'lightyellow';
  btnEl.style.background = pokemonSpecies.color;
  btnEl.style.color = _isColorBright(pokemonSpecies.color)
    ? 'gray'
    : 'lightgray';
  bodyEl.innerHTML = `
<p class="species-flavor-text">"${pokemonSpecies.flavorText}"</p><br>
<p><strong>Color:</strong> ${_capitalise(pokemonSpecies.color)}</p>
<p><strong>Growth Rate:</strong> ${_capitalise(pokemonSpecies.growthRate)}</p>
<p><strong>Evolves from:</strong> ${
    pokemonSpecies.evolvesFromSpecies
      ? `${_capitalise(pokemonSpecies.evolvesFromSpecies)}</p>`
      : KEYS.ui.labels.unknown
  }
<p><strong>Habitat:</strong> ${
    pokemonSpecies.habitat
      ? `${_capitalise(pokemonSpecies.habitat)}</p>`
      : KEYS.ui.labels.unknown
  }`;
  return pokemonSpecies;
};

// View Helper: enable Show Evolution Chain button
const renderFinalEvolutionBtn = pokemonSpecies => {
  const btnEl = pokemonSpecies.dom.querySelector('.btn-evolution');

  btnEl.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    pokemonSpecies.dom.classList.add('show-back');
  });
  btnEl.style.color = _isColorBright(pokemonSpecies.color) ? 'black' : 'white';
  btnEl.classList.remove('btn-disabled');
};

// View Helper: renders a PokemonSpecies Evolution Chain into card's back
const renderEvolutionChain = async (pokemonSpecies) => {
  const evolutionChain = await catchEvolutionChain(pokemonSpecies.evolutionChainId);

  // Render card back's inner body
  const speciesBackEl = pokemonSpecies.dom.querySelector('.species-main-back');
  let innerHTML = '';

  for (const species of evolutionChain) {
    const speciesTpl = `<li class="species-next">${_capitalise(
      species
    )}</li>`;
    innerHTML += speciesTpl;
  }
  const body = evolutionChain.length
    ? `<p><em>Evolution Chain:</em></p><ul class="species-evolution-chain">${innerHTML}</ul>`
    : `<p><em>No Evolution Chain registered for this species.</em></p>`;

  // Render card's back
  speciesBackEl.innerHTML = `<div class="species-title" title="${_capitalise(
    pokemonSpecies.name
  )}">${_capitalise(pokemonSpecies.name)}</div>
  <div class="species-body">${body}</div>
  <a href="#" class="btn btn-details">${KEYS.ui.labels.btnDetails}</a>`;

  // Render card's back button behavior
  const btnEl = speciesBackEl.querySelector('.btn-details');
  btnEl.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    pokemonSpecies.dom.classList.remove('show-back');
  });

  return pokemonSpecies;
}

// View Helper: renders cards details for 2nd phase of Species Catching
// Make fetches for each species, update cards details, evolution chain and buttons
const renderSpeciesDetails = async (speciesArr) => {
  for (const species of speciesArr) {
    const speciesId = _extractId(species.url);
    let pokemonSpecies = await catchSpeciesDetails(speciesId);

    // Render species details on card's front
    pokemonSpecies = await renderSpeciesBody(pokemonSpecies);
    // Render evolution chain on card's back
    pokemonSpecies = await renderEvolutionChain(pokemonSpecies)
    // Enable button on card's front
    await renderFinalEvolutionBtn(pokemonSpecies);
  }
};

// Main Render: fetches batch of Species, renders them and then their details
const renderHome = async () => {
  const speciesArr = await catchSpecies();

  // 1st phase
  renderSpecies(speciesArr);
  // 2nd phase
  renderSpeciesDetails(speciesArr);
};

// MAIN

// Render page as soon as DOM is available

document.addEventListener('DOMContentLoaded', () => {
  clearCache();
  renderHome();
});
