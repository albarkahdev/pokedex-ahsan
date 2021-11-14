import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { PokemonActions } from '../../../actions';
import { GlobalContext } from '../../../contexts/GlobalStateProvider';
import './CardPokemon.module.css';

const CardPokemon = (props) => {
  const { data } = props;
  const [{}, dispatch] = useContext(GlobalContext);
  const [pokemon, setPokemon] = useState({});

  const navigate = useNavigate();

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

  const handleShowDetailPokemon = () => {
    PokemonActions.setPokemon({ pokemon }, dispatch);
    navigate(`/${pokemon?.id}`);
  }
  
  return (
    <div onClick={handleShowDetailPokemon}>
      <p>{pokemon?.name}</p>
    </div>
  );
};

export default CardPokemon;
