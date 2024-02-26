import React from 'react';
import './botonVerMasStyle.css'

const VerMas = ({ onClick, isExpanded }) => {
  return (
    <button className="boton" onClick={onClick}>
      {isExpanded ? 'Ver menos' : 'Ver más'}
    </button>
  );
};

export default VerMas;
