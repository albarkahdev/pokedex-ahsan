import { useEffect, useContext, Suspense } from "react";

import { GlobalContext } from '../../contexts/GlobalStateProvider';
import { PokemonActions } from "../../actions";
import './HomePage.module.css';
import CardPokemon from "./CardPokemon/CardPokemon";

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
      <div>
        <p>HomePage</p>
        {pokemons.map(pokemon => {
          return (
            <Suspense fallback={<p>Loading Card Image...</p>}>
              <CardPokemon data={pokemon} />
            </Suspense>
          )
        })}
      </div>
    </Suspense>
  )
}

export default HomePage;
