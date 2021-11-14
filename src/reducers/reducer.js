export const actionTypes = {
  SET_CURRENT_POKEMONS: 'SET_CURRENT_POKEMONS',
};

const Reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_POKEMONS:
      return {
        ...state,
        pokemons: action.pokemons,
      };

    default:
      return state;
  }
};

export default Reducer;
