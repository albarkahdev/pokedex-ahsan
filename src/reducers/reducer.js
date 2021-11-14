export const actionTypes = {
  SET_POKEMON: 'SET_POKEMON',
  SET_POKEMONS: 'SET_POKEMONS',
  SET_NEXT_POKEMON_URL: 'SET_NEXT_POKEMON_URL',
};

const Reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_POKEMON:
      return {
        ...state,
        pokemon: action.pokemon,
      };
    case actionTypes.SET_POKEMONS:
      return {
        ...state,
        pokemons: action.pokemons,
      };
    case actionTypes.SET_NEXT_POKEMON_URL:
      return {
        ...state,
        nextPokemonURL: action.nextPokemonURL,
      };

    default:
      return state;
  }
};

export default Reducer;
