import { useEffect, useContext, Suspense } from "react";

import { GlobalContext } from '../../contexts/GlobalStateProvider';
import { PokemonActions } from "../../actions";
import './HomePage.module.css';
import CardPokemon from "./CardPokemon/CardPokemon";

const CardsPokemon = ({ pokemons }) => {
  return (
    <div>
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
      <div>
        <p>HomePage</p>
        <Suspense fallback={<p>Loading Card Image...</p>}>
          <CardsPokemon pokemons={pokemons} />
        </Suspense>
      </div>
    </Suspense>
  )
}

export default HomePage;
