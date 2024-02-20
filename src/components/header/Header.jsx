import React from 'react'
import estiloHeader from './header.module.css'
import Button from '../Button/Button.jsx'
import Logo from '../../assets/Logo.jpg'
const header = () => {


  
  return (
   <> 
    <header className='z-10'>
        <a href=""><img src= {Logo} alt="logo"/></a>
        <div>
          <Button className={estiloHeader.login}>Iniciar sesión</Button>
          <Button className={estiloHeader.signup}>Crear Cuenta</Button>
        </div>
    </header>
    </>
    )
}

export default header