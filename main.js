'use strict';

// CONSTANTS

const KEYS = {
  api: {
    baseUrl: 'https://pokeapi.co/api/v2',
    paginationLimit: 15,
  },
  entity: {
    evolutionChain: 'evolution-chain',
    pokemonSpecies: 'pokemon-species',
  },
  cache: {
    speciesCount: 'pokeapinav_speciesCount',
    homepageResults: 'pokeapinav_homepageResults',
    homepageEnhancements: 'pokeapinav_homepageEnhancements',
  },
  ui: {
    brightColors: ['white', 'pink', 'yellow'],
    language: 'en',
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
    this.flavorText = data.flavor_text_entries
      .filter(item => item.language.name === KEYS.ui.language)
      .pop().flavor_text;
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
    if (data.evolves_to.length) {
      this.evolvesTo = new ChainLink(data.evolves_to[0]);
    }
  }
}

// CATCHERS

// Helper: Pokemon Catcher, a wrapper function for Fetch API
// E.g. fetches /api/v2/pokemon-species/?limit=10 or /api/v2/pokemon-species/bulbasaur
const catch_ = (entity, id, options) => {
  let url = `${KEYS.api.baseUrl}/${entity}/${id && !isNaN(id) ? `${id}/` : ''}`;
  if (options && options instanceof Object && options.constructor === Object) {
    url += `?${Object.keys(options)
      .reduce((prev, option) => prev.concat(`${option}=${options[option]}`), [])
      .join('&')}`;
  }
  return fetch(url)
    .then(response => response.json())
    .catch(err => {
      document.querySelector('.species-main').innerHTML =
        '<p class="error">Sorry, there was an error fetching from PokéAPI. Please hunt again later.</p>';
    });
};

// Catcher: Run-once cached function that allows random Species Catching
const catchSpeciesCount = entity => {
  const storedCount = sessionStorage.getItem(KEYS.cache.speciesCount);
  if (storedCount) {
    return Promise.resolve(storedCount);
  }
  return catch_(KEYS.entity.pokemonSpecies, 'all', { limit: 1 }).then(data => {
    const count = data.count;
    sessionStorage.setItem(KEYS.cache.speciesCount, count);
    return count;
  });
};

// Catcher: Run-once cached function that provides initial set of Species
const catchHome = () => {
  const storedData = sessionStorage.getItem(KEYS.cache.homepageResults);
  if (storedData) {
    return Promise.resolve(JSON.parse(storedData));
  }
  return catchSpeciesCount(KEYS.entity.pokemonSpecies).then(count => {
    let randomOffset = Math.floor(Math.random() * count);
    randomOffset =
      randomOffset + KEYS.api.paginationLimit < count
        ? randomOffset
        : randomOffset - KEYS.api.paginationLimit;
    return catch_(KEYS.entity.pokemonSpecies, 'all', {
      limit: KEYS.api.paginationLimit,
      offset: randomOffset,
    }).then(data => {
      sessionStorage.setItem(
        KEYS.cache.homepageResults,
        JSON.stringify(data.results),
      );
      return data.results;
    });
  });
};

// Catcher: returns API data as an instance of EvolutionChain model
const catchEvolutionChain = id =>
  catch_(KEYS.entity.evolutionChain, id).then(data => new EvolutionChain(data));

// HELPERS

// View Helper: transforms a string by capitalising its first character
const _capitalise = str => str.slice(0, 1).toUpperCase() + str.slice(1);

// View Helper: tells if a color is bright
const _isColorBright = color => KEYS.ui.brightColors.indexOf(color) !== -1;

// Controller Helper: extracts ID from a URL returned by API
const _extractId = str =>
  str
    .split('/')
    .slice(-2, -1)
    .pop();

// Controller Helper: clear Homepage results from cache
const clearHomeResults = () => {
  sessionStorage.removeItem(KEYS.cache.homepageResults);
  return true;
};

// RENDERS

// View Helper: renders basic UI cards for initial phase of Species Catching
const renderSpecies = content => {
  const speciesEl = document.querySelector('.species-main');
  let innerHTML = '';
  for (const species of content) {
    const speciesId = _extractId(species.url);
    const speciesTpl = `
<li class="species-item" data-id="${speciesId}">
  <div class="species-main-flipper">
    <div class="species-main-front">
      <div class="species-title" title="${_capitalise(
        species.name,
      )}">${_capitalise(species.name)}</div>
      <div class="species-body">
        <div class="center">
          <img src="spinner.svg" width="24" height="24" alt="Loading...">
        </div>
      </div>
      <a href="" onclick="return false" class="btn btn-evolution btn-disabled">Show evolution chain</a>
    </div>
    <div class="species-main-back"></div>
  </div>
</li>`;
    innerHTML += speciesTpl;
  }
  speciesEl.innerHTML = `<ul class="species-list">${innerHTML}</ul>`;
};

// View Helper: enhances cards details for second phase of Species Catching
const renderSpeciesBody = pokemonSpecies => {
  const unknownLbl = '<em>Unknown</em>';
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
      : unknownLbl
  }
<p><strong>Habitat:</strong> ${
    pokemonSpecies.habitat
      ? `${_capitalise(pokemonSpecies.habitat)}</p>`
      : unknownLbl
  }`;
  return pokemonSpecies;
};

// View Helper: renders cards details for 2nd and 3rd phases of Species Catching
// Make fetches for each species, update cards details, evolution chain and buttons
const renderSpeciesDetails = content => {
  for (const species of content) {
    const speciesId = _extractId(species.url);
    catch_(KEYS.entity.pokemonSpecies, speciesId)
      // 2nd phase: wrap API response into model
      .then(data => new PokemonSpecies(data))
      // 2nd phase: render species details on card's front
      .then(pokemonSpecies => renderSpeciesBody(pokemonSpecies))
      // 3rd phase: render evolution chain on card's back
      .then(pokemonSpecies => renderEvolutionChain(pokemonSpecies))
      // 3rd phase: enable button on card's front
      .then(pokemonSpecies => {
        const btnEl = pokemonSpecies.dom.querySelector('.btn-evolution');
        btnEl.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          pokemonSpecies.dom.classList.toggle('show-back');
        });
        btnEl.style.color = _isColorBright(pokemonSpecies.color)
          ? 'black'
          : 'white';
        btnEl.classList.remove('btn-disabled');
      });
  }
};

// View Helper: renders a PokemonSpecies Evolution Chain into card's back
const renderEvolutionChain = pokemonSpecies => {
  return catchEvolutionChain(pokemonSpecies.evolutionChainId).then(
    evolutionChain => {
      // Render card back's inner body
      const speciesBackEl = pokemonSpecies.dom.querySelector(
        '.species-main-back',
      );
      let innerHTML = '';
      for (const species of evolutionChain) {
        const speciesTpl = `<li class="species-next">${_capitalise(
          species,
        )}</li>`;
        innerHTML += speciesTpl;
      }
      const body = evolutionChain.length
        ? `<p><em>Evolution Chain:</em></p><ul class="species-evolution-chain">${innerHTML}</ul>`
        : `<p><em>No Evolution Chain registered for this species.</em></p>`;

      // Render card's back
      speciesBackEl.innerHTML = `<div class="species-title" title="${_capitalise(
        pokemonSpecies.name,
      )}">${_capitalise(pokemonSpecies.name)}</div>
    <div class="species-body">${body}</div>
    <a href="#" class="btn btn-back">Show Species Details</a>`;

      // Render card's back button behavior
      speciesBackEl.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        pokemonSpecies.dom.classList.remove('show-back');
      });

      return pokemonSpecies;
    },
  );
};

// Main Render: fetches Species as content, renders them and then their details
const renderHome = () => {
  catchHome().then(content => {
    renderSpecies(content); // 1st phase
    renderSpeciesDetails(content); // 2nd phase
  });
};

// MAIN

// Render page as soon as DOM is available

document.addEventListener('DOMContentLoaded', () => {
  clearHomeResults();
  renderHome();
});
