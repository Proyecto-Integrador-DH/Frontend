import React from 'react'
import estiloHeader from './header.module.css'
import Button from '../Button/Button.jsx'
import Logo from '../../assets/Logo.jpg'
import { Link } from 'react-router-dom'
const header = () => {


  
  return (
   <> 
    <header className='z-10'>
    <Link to={"/"}>
        <a href=""><img src= {Logo} alt="logo"/></a>
    </Link>   
        <div>
          <Button className={estiloHeader.login}>Iniciar sesión</Button>
          <Button className={estiloHeader.signup}>Crear Cuenta</Button>
        </div>
    </header>
    </>
    )
}

export default header