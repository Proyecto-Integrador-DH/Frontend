import React from 'react';
import HeaderStyle from './header.module.css';
import Button from "../button/Button.jsx"
import Logo from '../../assets/Logo03.png';



const Header = () => {

  return (
   <> 
    <header>
      <div className={HeaderStyle.logo}>
        <div>
        <img src={Logo} alt="" />
        </div>
        <div className={HeaderStyle.textContainer}>
        <h2>Solo Aventuras</h2>
        <p>compañia sin igual!</p>
        </div>

      </div>

        <div>
          <Button className={HeaderStyle.login}>Iniciar sesión</Button>
          <Button className={HeaderStyle.signup}>Crear Cuenta</Button>
        </div>
    </header>
    </>
    )
}

export default Header;