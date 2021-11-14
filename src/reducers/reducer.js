export const actionTypes = {
  SET_POKEMONS: 'SET_POKEMONS',
  SET_POKEMON: 'SET_POKEMON',
};

const Reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_POKEMONS:
      return {
        ...state,
        pokemons: action.pokemons,
      };
    case actionTypes.SET_POKEMON:
      return {
        ...state,
        pokemon: action.pokemon,
      };

    default:
      return state;
  }
};

export default Reducer;
