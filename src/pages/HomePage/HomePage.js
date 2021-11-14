import { useEffect, useContext, Suspense, useState } from "react";

import { GlobalContext } from '../../contexts/GlobalStateProvider';
import { PokemonActions } from "../../actions";
import CardsPokemon from "./CardsPokemon/CardsPokemon";
import styles from './HomePage.module.css';

function HomePage() {
  const [loadingMore, setLoadingMore] = useState(false);
  const [{ pokemons, nextPokemonURL }, dispatch] = useContext(GlobalContext);

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

  useEffect(() => {
    setLoadingMore(true);
    let idTimeOut = setTimeout(() => {
      setLoadingMore(false);
    }, 1000);

    return () => idTimeOut && clearTimeout(idTimeOut);

  }, [nextPokemonURL]);

  const handleGetMorePokemons = async () => {
    try {
      setLoadingMore(true);
      const result = await PokemonActions.getMorePokemons(
        {
          nextPokemonURL,
          currentPokemons: pokemons,
        },
        dispatch
      );
    } catch (err) {
      console.log({err});
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <>
      <Suspense fallback={<p>Loading HomePage...</p>}>
        <div className={styles.container}>
          <h1>POKEDEX</h1>
          <Suspense fallback={<p>Loading Card Image...</p>}>
            <CardsPokemon pokemons={pokemons} />
          </Suspense>
        </div>
      </Suspense>
      <div className={styles.footer}>
        {
        nextPokemonURL && !loadingMore
        ? (<div className={styles.button_load_more} onClick={handleGetMorePokemons}>
            <p>Load more pokemon</p>
          </div>)
        : loadingMore && pokemons && (<div className={styles.button_load_more_loading}>
          <p>Loading..</p>
        </div>)
        }
      </div>
      
    </>
  )
}

export default HomePage;
