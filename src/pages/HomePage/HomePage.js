import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from '../../contexts/GlobalStateProvider';
import { PokemonActions } from "../../actions";
import './HomePage.module.css';

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
    <div>
      <p>HomePage</p>
      <nav>
        <Link to="/1">Detail</Link>
      </nav>
    </div>
  )
}

export default HomePage;
