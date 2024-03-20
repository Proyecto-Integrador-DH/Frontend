import React, { useEffect, useState } from 'react';
import HeaderStyle from './header.module.css';
import Button from "../button/Button.jsx"
import Logo from '../../assets/Logo.png';
import Inicio from '../../assets/Inicio.jpg';
import Registro from '../../assets/registrarse.png';
import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar.jsx';
import MenuHamburguesa from '../menuHambuguesa/MenuHamburguesa.jsx';

const Header = ({user, onLogout}) => {

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





  return (
   <div id="navbar" className={`${HeaderStyle.bloque} ${scrollPosition > 0 ? 'bg-white' :  'bg-transparent'}`}> 
        <div className='logo'>
            <Link to='/'>
            <img className='mt-2' src= {Logo} alt="logo"/>
            </Link>
        </div>


        
        <div className="mt-1">
        <div className="avatar">
          {user ? (
            <Avatar user={user} onLogout={onLogout} />
          ) : (
            <>
              {/* Renderizar el componente MenuHamburguesa solo en resoluciones móviles */}
              <div className="hidden md:block">
                <Link to="/Login">
                  <Button className={HeaderStyle.login}>Iniciar sesión</Button>
                </Link>
                <Link to="/crearUsuario">
                  <Button className={HeaderStyle.signup}>Crear Cuenta</Button>
                </Link>
              </div>
              <div className="md:hidden">
                <MenuHamburguesa user={user} onLogout={onLogout} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  );

  
};

export default Header;