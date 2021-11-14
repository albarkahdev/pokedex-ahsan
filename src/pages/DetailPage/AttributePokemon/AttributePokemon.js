import PropTypes from 'prop-types';

import styles from './AttributePokemon.module.css';

const AttributePokemon = ({ attribute, value }) => {
  return (
    <div className={styles.attribute_container}>
      <p className={styles.attribute}>{attribute}</p>
      <p className={styles.attribute_value}>{value}</p>
    </div>
  )
}

AttributePokemon.propTypes = {
  attribute: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default AttributePokemon;
