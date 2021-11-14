import { useEffect, useContext, Suspense, useState } from "react";

import FilterPokemon from "./FilterPokemon/FilterPokemon";
import CardsPokemon from "./CardsPokemon/CardsPokemon";
import { GlobalContext } from '../../contexts/GlobalStateProvider';
import { PokemonActions } from "../../actions";
import styles from './HomePage.module.css';

function HomePage() {
  const [loadingList, setLoadingList] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [{ pokemons, allPokemonByType, nextPokemonURL, currentTypePokemon }, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    const fetchApiPokemons = async () => {
      setLoadingList(true);
      try {
        const results = await PokemonActions.getPokemons(dispatch);
      } catch (err) {
        console.log({err});
      } finally {
        setLoadingList(false);
      }
    };

  fetchApiPokemons();
  }, []);

  const handleGetMorePokemons = async () => {
    setLoadingMore(true);
    if (currentTypePokemon !== "all") {
      const results = PokemonActions.getMorePokemonsByType({
        allPokemonByType,
        currentPokemons: pokemons,
      }, dispatch);

      setLoadingMore(false);
      return null;
    } else {
      try {
        const results = await PokemonActions.getMorePokemons(
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
  }

  return (
    <>
      <Suspense fallback={<p>Loading HomePage...</p>}>
        <div className={styles.container}>
          <h1>POKEDEX</h1>
          <Suspense fallback={<p>Loading Filter Types...</p>}>
            <FilterPokemon setLoadingList={setLoadingList} />
          </Suspense>
          <Suspense fallback={<p>Loading Card Image...</p>}>
            {!loadingList && <CardsPokemon pokemons={pokemons} />}
            {loadingList && <p>Loading List...</p>}
          </Suspense>
        </div>
      </Suspense>
      <div className={styles.footer}>
        {
        !loadingList && nextPokemonURL && !loadingMore
        ? (<div className={styles.button_load_more} onClick={handleGetMorePokemons}>
            <p>Load more pokemon</p>
          </div>)
        : (loadingList || loadingMore) && pokemons && (<div className={styles.button_load_more_loading}>
          <p>Loading...</p>
        </div>)
        }
      </div>
      
    </>
  )
}

export default HomePage;
