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

function dispatchNextPokemonURL({ nextPokemonURL }, dispatch) {
  dispatch({
    type: actionTypes.SET_NEXT_POKEMON_URL,
    nextPokemonURL,
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

function setNextPokemonURL({ nextPokemonURL }, dispatch) {
  if (!nextPokemonURL) return;

  dispatchNextPokemonURL(
    { nextPokemonURL }, dispatch,
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
    const resultsReq = await apiUtil.get(nextPokemonURL);
    const results = resultsReq?.data?.results;
    const next = resultsReq?.data?.next;

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

export {
  getPokemon,
  getPokemons,
  getMorePokemons,
  getTypesPokemon,
  setPokemon,
};
