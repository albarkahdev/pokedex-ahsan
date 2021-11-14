export const actionTypes = {
  SET_POKEMON: 'SET_POKEMON',
  SET_POKEMONS: 'SET_POKEMONS',
  SET_ALL_POKEMON_BY_TYPE: 'SET_ALL_POKEMON_BY_TYPE',
  SET_NEXT_POKEMON_URL: 'SET_NEXT_POKEMON_URL',
  SET_CURRENT_TYPE_POKEMON: 'SET_CURRENT_TYPE_POKEMON',
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
    case actionTypes.SET_ALL_POKEMON_BY_TYPE:
      return {
        ...state,
        allPokemonByType: action.allPokemonByType,
      };
    case actionTypes.SET_NEXT_POKEMON_URL:
      return {
        ...state,
        nextPokemonURL: action.nextPokemonURL,
      };
    case actionTypes.SET_CURRENT_TYPE_POKEMON:
      return {
        ...state,
        currentTypePokemon: action.currentTypePokemon,
      };

    default:
      return state;
  }
};

export default Reducer;
