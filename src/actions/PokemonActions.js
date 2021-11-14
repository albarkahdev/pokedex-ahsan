import { actionTypes } from '../reducers/reducer';
import apiUtil from '../utilities/apiUtil';

/*
  Dispatcher
*/

function dispatchPokemon({ pokemon }, dispatch) {
  dispatch({
    type: actionTypes.SET_POKEMON,
    pokemon,
  });
}

function dispatchPokemons({ pokemons }, dispatch) {
  dispatch({
    type: actionTypes.SET_POKEMONS,
    pokemons,
  });
}

function dispatchAllPokemonByType({ allPokemonByType }, dispatch) {
  dispatch({
    type: actionTypes.SET_ALL_POKEMON_BY_TYPE,
    allPokemonByType,
  });
}

function dispatchNextPokemonURL({ nextPokemonURL }, dispatch) {
  dispatch({
    type: actionTypes.SET_NEXT_POKEMON_URL,
    nextPokemonURL,
  });
}

function dispatchCurrentTypePokemon({ currentTypePokemon }, dispatch) {
  dispatch({
    type: actionTypes.SET_CURRENT_TYPE_POKEMON,
    currentTypePokemon,
  });
}

/*
  SetterDispatcher
*/

function setPokemon({ pokemon }, dispatch) {
  if (!pokemon) return;

  dispatchPokemon(
    { pokemon }, dispatch,
  );
}

function setPokemons({ pokemons }, dispatch) {
  if (!pokemons) return;

  dispatchPokemons(
    { pokemons }, dispatch,
  );
}

function setAllPokemonByType({ allPokemonByType }, dispatch) {
  if (!allPokemonByType) return;

  dispatchAllPokemonByType(
    { allPokemonByType }, dispatch,
  );
}

function setNextPokemonURL({ nextPokemonURL }, dispatch) {
  if (!nextPokemonURL) return;

  dispatchNextPokemonURL(
    { nextPokemonURL }, dispatch,
  );
}

function setCurrentTypePokemon({ currentTypePokemon }, dispatch) {
  if (!currentTypePokemon) return;

  dispatchCurrentTypePokemon(
    { currentTypePokemon }, dispatch,
  );
}

/*
  Method
*/

async function getPokemon({ pokemonId }) {
  try {
    const { data } = await apiUtil.get(`/pokemon/${pokemonId}/`);

    return data;
  } catch (error) {
    throw error;
  }
}

async function getPokemons(dispatch) {
  try {
    const { data: { results, next }} = await apiUtil.get('/pokemon?limit=10');

    setPokemons({ pokemons: results }, dispatch);

    if (next) {
      const nextPokemonURL = next.replace(process.env.REACT_APP_BASE_SERVER_URL, '');
      setNextPokemonURL({ nextPokemonURL }, dispatch);
    }

    return results;
  } catch (error) {
    throw error;
  }
}

async function getMorePokemons({ nextPokemonURL, currentPokemons }, dispatch) {
  try {
    const { data: { results, next }} = await apiUtil.get(nextPokemonURL);

    const mergePokemonList = currentPokemons.concat(results);

    setPokemons({ pokemons: mergePokemonList }, dispatch);

    if (next) {
      const nextPokemonURL = next.replace(process.env.REACT_APP_BASE_SERVER_URL, '');
      setNextPokemonURL({ nextPokemonURL }, dispatch);
    }

    return results;
  } catch (error) {
    throw error;
  }
}

async function getTypesPokemon() {
  try {
    const { data: { results }} = await apiUtil.get('/type');

    return results;
  } catch (error) {
    throw error;
  }
}

async function getPokemonsByType({ typeId }, dispatch) {
  try {
    const { data: { pokemon }} = await apiUtil.get(`/type/${typeId}`);

    setAllPokemonByType({ allPokemonByType: pokemon }, dispatch);

    let firstTen = pokemon.slice(0, 10);
    firstTen = firstTen.map(itemPokemon => ({ ...itemPokemon?.pokemon }));
    setPokemons({ pokemons: firstTen }, dispatch);

    return pokemon;
  } catch (error) {
    throw error;
  }
}

function getMorePokemonsByType({ allPokemonByType, currentPokemons }, dispatch) {
  const lengthCurrentPokemons = currentPokemons.length;
  const lengthAllPokemonByType = allPokemonByType.length;
  const lengthRestPokemon = lengthAllPokemonByType - lengthCurrentPokemons;
  let nextPokemons = [];

  if (lengthRestPokemon > 10) {
    nextPokemons = allPokemonByType.slice((lengthCurrentPokemons), (lengthCurrentPokemons + 10));
  } else {
    nextPokemons = allPokemonByType.slice((lengthCurrentPokemons), lengthAllPokemonByType);
  }

  nextPokemons = nextPokemons.map(itemPokemon => ({ ...itemPokemon?.pokemon }));

  const mergePokemonList = currentPokemons.concat(nextPokemons);

  setPokemons({ pokemons: mergePokemonList }, dispatch);

  return mergePokemonList;
}

export {
  getPokemon,
  getPokemons,
  getMorePokemons,
  getTypesPokemon,
  getPokemonsByType,
  getMorePokemonsByType,
  setPokemon,
  setCurrentTypePokemon,
};
