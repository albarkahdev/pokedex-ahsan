import { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import ImageViewer from 'react-simple-image-viewer';

import AttributePokemon from './AttributePokemon/AttributePokemon';
import ImagePokemon from './ImagePokemon/ImagePokemon';
import { PokemonActions } from '../../actions';
import { GlobalContext } from '../../contexts/GlobalStateProvider';
import styles from './DetailPage.module.css';

function DetailPage() {
  const [{ pokemon }, dispatch] = useContext(GlobalContext);
  const [currentPokemon, setCurrentPokemon] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);


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
    const sprites = Object.keys(currentPokemon?.sprites || {})?.map(val => (currentPokemon?.sprites?.[val]))?.filter(val => typeof val === "string");

    return {
      weight,
      height,
      types,
      abilities,
      stats,
      sprites,
    }
  }, [currentPokemon]);

  const attributePokemon = getAttributePokemon();

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

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
            <AttributePokemon attribute="Weight" value={attributePokemon?.weight} />
            <AttributePokemon attribute="Height" value={attributePokemon?.height} />
            <AttributePokemon attribute="Abilities" value={attributePokemon?.abilities} />
            <AttributePokemon attribute="Types" value={attributePokemon?.types} />
            {attributePokemon?.stats?.map(stat => {
              return <AttributePokemon attribute={stat?.nameStats} value={stat?.baseStats} />
            })}
          </div>
        </div>
        
      </div>
      <div className={styles.footer}>
        <div className={styles.images_title}>
          <h3>Images</h3>
        </div>
        <div className={styles.images_container}>
          {attributePokemon?.sprites?.map((sprite, indexSprite) => {
            return (
              <ImagePokemon
                src={sprite}
                alt="sprite_image"
                onClick={() => openImageViewer(indexSprite)}
              />
            )
          })}

          {isViewerOpen && (
            <ImageViewer
              src={attributePokemon?.sprites}
              currentIndex={ currentImage }
              disableScroll={ false }
              closeOnClickOutside={ true }
              onClose={ closeImageViewer }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailPage;
