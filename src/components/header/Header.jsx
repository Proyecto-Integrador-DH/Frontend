import React, { useEffect, useState } from 'react';
import HeaderStyle from './header.module.css';
import Button from "../button/Button.jsx"
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

const header = () => {

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
        <Link to='/'>
        <img src= {Logo} alt="logo"/>
        </Link>
        <div className='mt-1'>
          <Button className={HeaderStyle.login}>Iniciar sesión</Button>
          <Button className={HeaderStyle.signup}>Crear Cuenta</Button>
        </div>


        
    </div>
  );
};

export default header;