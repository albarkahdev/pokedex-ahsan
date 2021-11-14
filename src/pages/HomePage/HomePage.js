import { useEffect, useContext, Suspense } from "react";

import { GlobalContext } from '../../contexts/GlobalStateProvider';
import { PokemonActions } from "../../actions";
import CardPokemon from "./CardPokemon/CardPokemon";
import styles from './HomePage.module.css';

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

function HomePage() {
  const [{ pokemons }, dispatch] = useContext(GlobalContext);

  useEffect(() => {

    const fetchApiPokemons = async () => {
      try {
        const result = await PokemonActions.getPokemons(dispatch);
      } catch (err) {
        console.log({err});
      }
    };

  fetchApiPokemons();
  }, []);

  return (
    <Suspense fallback={<p>Loading HomePage...</p>}>
      <div className={styles.container}>
        <h1>POKEDEX</h1>
        <Suspense fallback={<p>Loading Card Image...</p>}>
          <CardsPokemon pokemons={pokemons} />
        </Suspense>
      </div>
    </Suspense>
  )
}

export default HomePage;
