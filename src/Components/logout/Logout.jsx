import React from 'react';
import LogoutStyles from "./Logout.module.css";
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {

    localStorage.removeItem('token'); 
    
    history.push('/Login');
  };

  return (
    <button className={LogoutStyles.botonCerrarSesion} onClick={handleLogout}>Cerrar Sesión</button>
  );
};

export default LogoutButton;