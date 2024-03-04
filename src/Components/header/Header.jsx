import React, { useEffect, useState } from 'react';
import HeaderStyle from './header.module.css';
import Button from '../button/Button';
import Logo from '../../assets/Logo.png';
import Inicio from '../../assets/Inicio.jpg';
import Registro from '../../assets/registrarse.png';
import { Link } from 'react-router-dom';

const Header = () => {

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  return (
   <div id="navbar" className={`${HeaderStyle.bloque} ${scrollPosition > 0 ? 'bg-white' :  'bg-transparent'}`}> 
        <div>
            <Link to='/'>
            <img src= {Logo} alt="logo"/>
            </Link>
        </div>


        
        <div className='mt-1'>
          <div className='flex'>
            <button id="boton-hamburguesa" className={HeaderStyle.botonHamburguesa} onClick={toggleMenu}>
              <img src= {Inicio} alt="logo"/>
            </button>
            <button id="boton-hamburguesa" className={HeaderStyle.botonHamburguesa} onClick={toggleMenu}>
              <img src= {Registro} alt="logo"/>
            </button>
          </div>
          <div>
            <Button className={HeaderStyle.login}>Iniciar sesión</Button>
            <Button className={HeaderStyle.signup}>Crear Cuenta</Button>
          </div>

        </div>
    </div>

  );

  
};

export default Header;