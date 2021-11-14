import { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { PokemonActions } from '../../actions';

import { GlobalContext } from '../../contexts/GlobalStateProvider';

import styles from './DetailPage.module.css';

const Attribute = ({ attribute, value }) => {
  return (
    <div className={styles.attribute_container}>
      <p className={styles.attribute}>{attribute}</p>
      <p className={styles.attribute_value}>{value}</p>
    </div>
  )
}

const ImagePokemon = ({ src, alt }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={styles.images_item}>
      <img
        className={styles.images}
        src={src}
        alt={alt}
      />
    </div>
  )
}

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

  const getAttributePokemon = useCallback(() => {
    const weight = currentPokemon?.weight;
    const height = currentPokemon?.height;
    let types = currentPokemon?.types;
    types = types?.map(val => (val?.type?.name));
    types = types?.join(', ');
    let abilities = currentPokemon?.abilities;
    abilities = abilities?.map(val => (val?.ability?.name));
    abilities = abilities?.join(', ');
    let stats = currentPokemon?.stats;
    stats = stats?.map(val => ({ nameStats: val?.stat?.name, baseStats: val?.base_stat }));

    return {
      weight,
      height,
      types,
      abilities,
      stats,
    }
  }, [currentPokemon]);

  const attributePokemon = getAttributePokemon();

  if (currentPokemon === {}) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{currentPokemon?.name}</h1>
        <h1 className={styles.id}>#{currentPokemon?.id}</h1>
        
      </div>
      <div className={styles.detail}>
        <div className={styles.image_container}>
          <img
            className={styles.thumbnail}
            src={currentPokemon?.sprites?.front_default}
            alt={currentPokemon?.name}
          />
          
        </div>
        <div className={styles.detail_attribute}>
          <div className={styles.box_detail_attribute}>
            <Attribute attribute="Weight" value={attributePokemon?.weight} />
            <Attribute attribute="Height" value={attributePokemon?.height} />
            <Attribute attribute="Abilities" value={attributePokemon?.abilities} />
            <Attribute attribute="Types" value={attributePokemon?.types} />
            {attributePokemon?.stats?.map(stat => {
              return <Attribute attribute={stat?.nameStats} value={stat?.baseStats} />
            })}
          </div>
        </div>
        
      </div>
      <div className={styles.footer}>
        <div className={styles.images_title}>
          <h3>Images</h3>
        </div>
        <div className={styles.images_container}>
          <ImagePokemon
            src={currentPokemon?.sprites?.front_default}
            alt="front_default"
          />
          <ImagePokemon
            src={currentPokemon?.sprites?.front_female}
            alt="front_female"
          />
          <ImagePokemon
            src={currentPokemon?.sprites?.front_shiny}
            alt="front_shiny"
          />
          <ImagePokemon
            src={currentPokemon?.sprites?.front_shiny_female}
            alt="front_shiny_female"
          />
          <ImagePokemon
            src={currentPokemon?.sprites?.back_default}
            alt="back_default"
          />
          <ImagePokemon
            src={currentPokemon?.sprites?.back_female}
            alt="back_female"
          />
          <ImagePokemon
            src={currentPokemon?.sprites?.back_shiny}
            alt="back_shiny"
          />
          <ImagePokemon
            src={currentPokemon?.sprites?.back_shiny_female}
            alt="back_shiny_female"
          />
        </div>
      </div>
    </div>
  )
}

export default DetailPage;
