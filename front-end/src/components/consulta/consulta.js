import React from 'react';
import PropTypes from 'prop-types';
import styles from "./consulta.module.css";

const Consulta = () => {
   
   return (
      <div className={styles.Consulta} data-testid="Consulta">
      <h1 style={{ color: 'white' }}>Consulta</h1>
      </div>
   );
}

Consulta.propTypes = {};

Consulta.defaultProps = {};

export default Consulta;
