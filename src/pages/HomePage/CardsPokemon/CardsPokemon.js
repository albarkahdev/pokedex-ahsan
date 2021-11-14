import PropTypes from 'prop-types';

import CardPokemon from '../CardPokemon/CardPokemon';
import styles from './CardsPokemon.module.css';

const CardsPokemon = ({ pokemons }) => {
  return (
    <div className={styles.cards_container}>
      {pokemons?.map(pokemon => {
        return (
            <CardPokemon data={pokemon} />
        )
      })}
    </div>
  )
}

CardsPokemon.propTypes = {
  pokemons: PropTypes.array.isRequired,
};

export default CardsPokemon;
