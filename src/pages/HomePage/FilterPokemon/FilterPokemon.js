import { useEffect, useState } from "react";
import { PokemonActions } from "../../../actions";

import styles from "./FilterPokemon.module.css";

const FilterPokemon = () => {
  const [typesPokemon, setTypesPokemon] = useState([]);

  useEffect(() => {
    const fetchApiPokemons = async () => {
      try {
        const results = await PokemonActions.getTypesPokemon();
        if (results) {
          setTypesPokemon(results);
        }
      } catch (err) {
        console.log({err});
      }
    };

  fetchApiPokemons();
  }, []);

  return (
    <form>
      <select className={styles.select_type} id="type_pokemon" name="type_pokemon">
        <option value="all">All Types</option>
        {
          typesPokemon?.map(typePokemon => <option value={typePokemon?.name}>{typePokemon?.name}</option>)
        }
      </select>
    </form>
  )
}

export default FilterPokemon;
