import { useEffect, useState } from 'react';

import { PokemonActions } from '../../../actions';
import './CardPokemon.module.css';

const CardPokemon = (props) => {
  const { data } = props;
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchApiPokemon = async () => {
      try {
        let pokemonId = data?.url?.replace(`${process.env.REACT_APP_BASE_SERVER_URL}/pokemon/`, '');
        pokemonId = pokemonId?.replace('/', '');

        if (!pokemonId) {
          return null;
        }
        
        pokemonId = Number(pokemonId);

        const result = await PokemonActions.getPokemon({ pokemonId });

        setPokemon(result);
      } catch (err) {
        console.log({err});
      }
    };

  fetchApiPokemon();
  }, []);
  
  return (
    <div>
      <p>{pokemon?.name}</p>
    </div>
  );
};

export default CardPokemon;
