import React from 'react';
import PropTypes from 'prop-types';
import styles from "./consulta.module.css";
import Navbar from "../Navbar/Navbar";

const Consulta = () => {
   
   return (
      <div className={styles.Consulta} data-testid="Consulta">
         <Navbar />
      <h1 style={{ color: 'white' }}>Consulta</h1>
      </div>
   );
}

Consulta.propTypes = {};

Consulta.defaultProps = {};

export default Consulta;
