import React from 'react';
import ButtonStyle from'./button.module.css';


const button = ({children, className}) => {

  return (
    <button className={`${ButtonStyle.boton} ${className}`}>
        {children}
    </button>
  )
}

export default button;