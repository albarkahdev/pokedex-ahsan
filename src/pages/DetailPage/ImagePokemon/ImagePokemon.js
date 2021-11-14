import PropTypes from 'prop-types';

import styles from './ImagePokemon.module.css';

const ImagePokemon = ({ src, alt, onClick }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={styles.images_item} onClick={onClick}>
      <img
        className={styles.images}
        src={src}
        alt={alt}
      />
    </div>
  )
}

ImagePokemon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};

export default ImagePokemon;
