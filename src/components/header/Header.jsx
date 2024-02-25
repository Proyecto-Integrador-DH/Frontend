import React from 'react';
import HeaderStyle from './header.module.css';
import Button from "../button/Button.jsx"
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';



const Header = () => {

  return (
   <> 
    <header className='px-20'>
        <Link to='/'>
        <img src= {Logo} alt="logo"/>
        </Link>
        <div className='mt-1'>
          <Button className={HeaderStyle.login}>Iniciar sesión</Button>
          <Button className={HeaderStyle.signup}>Crear Cuenta</Button>
        </div>
    </header>
    </>
    )
}

export default Header;