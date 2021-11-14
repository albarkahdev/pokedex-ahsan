import { actionTypes } from '../reducers/reducer';
import apiUtil from '../utilities/apiUtil';

/*
  Dispatcher
*/

function dispatchCurrentPokemons({ pokemons }, dispatch) {
  dispatch({
    type: actionTypes.SET_CURRENT_POKEMONS,
    pokemons,
  });
}

/*
  SetterDispatcher
*/

function setCurrentPokemons({ pokemons }, dispatch) {
  if (!pokemons) return;

  dispatchCurrentPokemons(
    // { pokemons: cloneDeep(pokemons) }, dispatch,
    { pokemons }, dispatch,
  );
}

/*
  Helpers
*/

/*
  Method
*/

async function getPokemons(dispatch) {
  try {
    const { data: { results }} = await apiUtil.get('/pokemon?limit=10');
    // const { data: { results }} = await apiUtil.get('/pokemon?limit=10&offset=10');

    setCurrentPokemons({ pokemons: results }, dispatch);

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
  getPokemon
};
