import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PokemonActions } from '../../../actions';
import { GlobalContext } from '../../../contexts/GlobalStateProvider';
import styles from './CardPokemon.module.css';

const CardPokemon = ({ data }) => {
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
    <div className={styles.card_pokemon} onClick={handleShowDetailPokemon}>
      <div className={styles.image_container}>
        <img className={styles.image} src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
      </div>
      <div className={styles.description}>
        <div className={styles.id}>
          <p>#{pokemon?.id}</p>
        </div>
        <div className={styles.name}>
          <h3>{pokemon?.name}</h3>
        </div>
        <div className={styles.types}>
          {
            pokemon?.types?.map(type => {
              return (
                <div className={styles.type}>
                  <p>{type?.type?.name}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

CardPokemon.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardPokemon;
