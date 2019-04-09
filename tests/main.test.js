"use strict";

global.fetch = require("jest-fetch-mock");

const {
  mockedSpeciesList,
  mockedSpeciesListWithLimitOne,
  mockedSpeciesData,
  mockedSpeciesInstance,
  mockedEvolutionData,
  mockedEvolutionInstance
} = require("./mock");

const {
  // constants
  KEYS,
  // models
  PokemonSpecies,
  EvolutionChain,
  ChainLink,
  // helpers
  _isColorBright,
  _capitalise,
  _extractId,
  clearCache,
  // catchers
  catch_,
  catchSpeciesCount,
  catchSpecies,
  catchSpeciesDetails,
  catchEvolutionChain,
  // renderers
  renderSpecies,
  renderSpeciesBody,
  renderFinalEvolutionBtn,
  renderEvolutionChain,
  renderSpeciesDetails,
  renderHome
} = require("../src/main");

// TEST MODELS

describe("models", () => {
  test("PokemonSpecies is initialised correctly", () => {
    const model = new PokemonSpecies(mockedSpeciesData);

    expect(model).toMatchObject(mockedSpeciesInstance);
  });

  test("EvolutionChain is initialised correctly", () => {
    // TODO: test getter and iterator
    const model = new EvolutionChain(mockedEvolutionData);

    expect(model).toMatchObject(mockedEvolutionInstance);
  });

  test("ChainLink is initialised correctly", () => {
    const model = new ChainLink(mockedEvolutionData.chain);

    expect(model).toMatchObject(mockedEvolutionInstance.evolvesTo);
  });
});

// TEST HELPERS

describe("helpers", () => {
  test("uppercase first string character", () => {
    expect(_capitalise("this is a sentence")).toBe("This is a sentence");
  });

  test("tell if color is bright for layout", () => {
    expect(_isColorBright("white")).toBeTruthy();
    expect(_isColorBright("pink")).toBeTruthy();
    expect(_isColorBright("black")).toBeFalsy();
    expect(_isColorBright("brown")).toBeFalsy();
  });

  test("extract last segment from url path (id)", () => {
    expect(_extractId("https://pokeapi.co/api/v2/pokemon-species/174/")).toBe(
      "174"
    );
    expect(
      _extractId("https://any.website.4u/api/get-me-this/")
    ).toBe("get-me-this");
  });

  test("clear session storage cache", async () => {
    const entity = KEYS.entity.pokemonSpecies;

    fetch.resetMocks();
    fetch
      .mockResponseOnce(JSON.stringify(mockedSpeciesListWithLimitOne))
      .mockResponseOnce(JSON.stringify(mockedSpeciesData));

    await catchSpecies();

    expect(sessionStorage.getItem(KEYS.cache.speciesCount)).not.toBeNull();
    expect(sessionStorage.getItem(KEYS.cache.homepageSpecies)).not.toBeNull();

    expect(clearCache()).toBe(true);
    expect(sessionStorage.getItem(KEYS.cache.speciesCount)).not.toBeNull();
    expect(sessionStorage.getItem(KEYS.cache.homepageSpecies)).toBeNull();
  });
});

// TEST CATCHERS

describe("catchers (mocks 'fetch' for api)", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("main catcher", async () => {
    const entity = KEYS.entity.pokemonSpecies;
    const id = mockedSpeciesData.id;
    const url = `${KEYS.api.baseUrl}/${entity}/${id}/`;

    fetch.mockResponseOnce(JSON.stringify(mockedSpeciesList));
    const catched = await catch_(entity, id);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(catched.results).toBeDefined();
  });

  test("main catcher with limit", async () => {
    const entity = KEYS.entity.pokemonSpecies;
    const id = "all";
    const options = { limit: 1 };
    const url = `${KEYS.api.baseUrl}/${entity}/?limit=1`;

    fetch.mockResponseOnce(JSON.stringify(mockedSpeciesListWithLimitOne));
    const catched = await catch_(entity, id, options);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(catched.results).toHaveLength(1);
  });

  test("catch species count", async () => {
    const entity = KEYS.entity.pokemonSpecies;
    const url = `${KEYS.api.baseUrl}/${entity}/?limit=1`;

    clearCache(true);
    fetch.mockResponseOnce(JSON.stringify(mockedSpeciesListWithLimitOne));
    const speciesCount = await catchSpeciesCount(entity);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(speciesCount).toEqual(mockedSpeciesListWithLimitOne.count);
  });

  test("catch species", async () => {
    const entity = KEYS.entity.pokemonSpecies;
    const url1 = `${KEYS.api.baseUrl}/${entity}/?limit=1`;
    const url2 = `${KEYS.api.baseUrl}/${entity}/?limit=10&offset=`;

    clearCache(true);
    fetch
      .mockResponseOnce(JSON.stringify(mockedSpeciesListWithLimitOne))
      .mockResponseOnce(JSON.stringify(mockedSpeciesList));
    const catched = await catchSpecies();

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[0][0]).toContain(url1);
    expect(fetch.mock.calls[1][0]).toContain(url2);
    expect(catched).toHaveLength(10);
  });

  test("catch species details", async () => {
    const entity = KEYS.entity.pokemonSpecies;
    const id = mockedEvolutionData.id;
    const url = `${KEYS.api.baseUrl}/${entity}/${id}/`;
    const mockedPokemonSpecies = new PokemonSpecies(mockedSpeciesData);

    fetch.mockResponseOnce(JSON.stringify(mockedSpeciesData));
    const catched = await catchSpeciesDetails(mockedEvolutionData.id);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(catched).toEqual(mockedPokemonSpecies);
  });

  test("catch evolution chain", async () => {
    const mockedEvolutionChain = new EvolutionChain(mockedEvolutionData);
    const entity = KEYS.entity.evolutionChain;
    const id = mockedEvolutionData.id;
    const url = `${KEYS.api.baseUrl}/${entity}/${id}/`;

    fetch.mockResponseOnce(JSON.stringify(mockedEvolutionData));
    const catched = await catchEvolutionChain(mockedEvolutionData.id);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(url);
    expect(catched).toEqual(mockedEvolutionChain);
  });
});

// TEST RENDERERS

describe.skip("renderers", () => {
  test("render species", () => {
    const renderSpecies = jest.fn(renderSpecies);

    renderSpecies(speciesArr);

    expect(renderSpecies).toHaveReturned();
  });

  test("render species body", () => {
    const renderSpeciesBody = jest.fn(renderSpeciesBody);

    renderSpeciesBody(mockedSpeciesInstance);

    expect(renderSpeciesBody).toHaveReturned();
  });

  test("render final evolution button", () => {
    const renderFinalEvolutionBtn = renderFinalEvolutionBtn;
    renderFinalEvolutionBtn = jest.fn(renderFinalEvolutionBtn);

    renderFinalEvolutionBtn(mockedSpeciesInstance);

    expect(renderFinalEvolutionBtn).toHaveReturned();
  });

  test("render evolution chain", () => {
    const renderEvolutionChain = jest.fn(renderEvolutionChain);

    renderEvolutionChain(mockedSpeciesInstance);

    expect(renderEvolutionChain).toHaveReturned();
  });

  test("render species details", () => {
    const renderSpeciesDetails = jest.fn(renderSpeciesDetails);

    renderSpeciesDetails(speciesArr);

    expect(renderSpeciesDetails).toHaveReturned();
  });

  test("main render", () => {
    const renderHome = jest.fn(renderHome);
    const renderSpecies = jest.fn(renderSpecies);
    const renderSpeciesDetails = jest.fn(renderSpeciesDetails);

    renderHome();

    expect(renderHome).toHaveReturned();
    expect(renderSpecies.toHaveBeenCalledTimes(1));
    expect(renderSpeciesDetails.toHaveBeenCalledTimes(1));
  });
});

// TODO
// - fix/unskip renderers tests
// - test exception handling
// - test listener: DOMContentLoaded
