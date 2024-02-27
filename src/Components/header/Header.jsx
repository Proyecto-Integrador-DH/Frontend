import React from 'react';
import HeaderStyle from './header.module.css';
import Button from "../button/Button.jsx"
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
   <div className={HeaderStyle.bloque}> 
        <Link to='/'>
        <img src= {Logo} alt="logo"/>
        </Link>
        <div className='mt-1'>
          <Link to={'/Login'}>
          <Button className={HeaderStyle.login}>Iniciar sesión</Button>
          </Link>
          <Button className={HeaderStyle.signup}>Crear Cuenta</Button>
        </div>
    </div>
  );
};

export default Header;
