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
    const { data: { results }} = await apiUtil.get('/pokemon?limit=10&offset=10');
    const result2 = await apiUtil.get('/pokemon/11/');
    console.log({ results, result2 });

    return result2;
  } catch (error) {
    throw error;
  }
}

export {
  getPokemons,
};
