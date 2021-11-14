import { actionTypes } from '../reducers/reducer';
import apiUtil from '../utilities/apiUtil';

/*
  Dispatcher
*/

function dispatchPokemons({ pokemons }, dispatch) {
  dispatch({
    type: actionTypes.SET_POKEMONS,
    pokemons,
  });
}

function dispatchPokemon({ pokemon }, dispatch) {
  dispatch({
    type: actionTypes.SET_POKEMON,
    pokemon,
  });
}

/*
  SetterDispatcher
*/

function setPokemons({ pokemons }, dispatch) {
  if (!pokemons) return;

  dispatchPokemons(
    // { pokemons: cloneDeep(pokemons) }, dispatch,
    { pokemons }, dispatch,
  );
}

function setPokemon({ pokemon }, dispatch) {
  if (!pokemon) return;

  dispatchPokemons(
    // { pokemon: cloneDeep(pokemon) }, dispatch,
    { pokemon }, dispatch,
  );
}

/*
  Method
*/

async function getPokemons(dispatch) {
  try {
    const { data: { results }} = await apiUtil.get('/pokemon?limit=10');
    // const { data: { results }} = await apiUtil.get('/pokemon?limit=10&offset=10');

    setPokemons({ pokemons: results }, dispatch);

    return results;
  } catch (error) {
    throw error;
  }
}

async function getPokemon({ pokemonId }) {
  try {
    const { data } = await apiUtil.get(`/pokemon/${pokemonId}/`);
    console.log({ data });

    return data;
  } catch (error) {
    throw error;
  }
}

export {
  getPokemons,
  getPokemon,
  setPokemon,
};
