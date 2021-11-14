import React, { createContext, useReducer } from 'react';
import Reducer from '../reducers/reducer';

export const initialState = {
  pokemon: {},
  pokemons: [],
  allPokemonByType: [],
  nextPokemonURL: null,
};

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalContext = createContext(initialState);
export default GlobalStateProvider;
