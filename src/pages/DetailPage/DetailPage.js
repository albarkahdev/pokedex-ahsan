import { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { PokemonActions } from '../../actions';

import { GlobalContext } from '../../contexts/GlobalStateProvider';

import './DetailPage.module.css';

function DetailPage() {
  const [{ pokemon }, dispatch] = useContext(GlobalContext);
  const [currentPokemon, setCurrentPokemon] = useState({});

  const params = useParams();

  useEffect(() => {

    const fetchApiPokemon = async () => {
      const { pokemonId } = params;

      try {
        if (pokemon?.id === pokemonId) {
          setCurrentPokemon(pokemon);
          return null;
        }

        const result = await PokemonActions.getPokemon({ pokemonId });
        setCurrentPokemon(result);
        PokemonActions.setPokemon({ pokemon: result }, dispatch);
      } catch (err) {
        console.log({err});
      }
    };

  fetchApiPokemon();
  }, []);

  if (currentPokemon === {}) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <p>Name: {currentPokemon?.name}</p>
      <img src={currentPokemon?.sprites?.front_default} />
    </div>
  )
}

export default DetailPage;
