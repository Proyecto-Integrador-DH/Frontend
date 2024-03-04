import React from 'react';
import ButtonStyle from'./button.module.css';


const Button = ({children, className}) => {

  return (
    <button className={`${ButtonStyle.boton} ${className}`}>
        {children}
    </button>
  )
}

export default Button;