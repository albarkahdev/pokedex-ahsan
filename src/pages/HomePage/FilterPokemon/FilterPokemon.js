import { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';

import { PokemonActions } from "../../../actions";
import { GlobalContext } from "../../../contexts/GlobalStateProvider";
import styles from "./FilterPokemon.module.css";

const FilterPokemon = ({ setLoadingList }) => {
  const [{}, dispatch] = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
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

  const handleChangeTypeFilter = async (e) => {
    setLoadingList(true);
    e.preventDefault();
    const value = e.target.value;

    PokemonActions.setCurrentTypePokemon(
      { currentTypePokemon: value },
      dispatch,
    );

    if (value === "all") {
      try {
        const results = await PokemonActions.getPokemons(dispatch);
      } catch (err) {
        console.log({err});
      } finally {
        setLoadingList(false);
      }
    } else {
      try {
        const results = await PokemonActions.getPokemonsByType({
          typeId: value,
        }, dispatch);
      } catch (err) {
        console.log({err});
      } finally {
        setLoadingList(false);
      }
    }
  }

  return (
    <form>
      <select
        className={styles.select_type}
        id="type_pokemon"
        name="type_pokemon"
        onChange={handleChangeTypeFilter}
      >
        <option value="all">All Types</option>
        {
          typesPokemon?.map(typePokemon => {
            let idType = typePokemon?.url?.replace(`${process.env.REACT_APP_BASE_SERVER_URL}/type/`, '');
            idType = idType?.replace('/', '');

            if (!idType) {
              return null;
            }

            return <option value={idType}>{typePokemon?.name}</option>
          })
        }
      </select>
    </form>
  )
}

FilterPokemon.propTypes = {
  setLoadingList: PropTypes.func.isRequired,
};

export default FilterPokemon;
