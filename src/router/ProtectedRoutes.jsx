import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import ErrorComponent from '../Components/error/ErrorAlert.jsx';

const ProtectedRoutes = () => {
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.roles[0].nombre === 'Administrador') {
          setIsAuthenticated(true);
        } else {
          setError('No tiene permisos para acceder a esta sección.');
          setTitleError('Acceso denegado.');
          setModalErrorVisible(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      } catch (error) {
       
        console.error('Error al decodificar el token:', error);
      }
    } else {
      setError('Debe iniciar sesión para acceder a esta sección.');
      setTitleError('Acceso denegado.');
      setModalErrorVisible(true);
    }
  }, []);

  const closeModal = () => {
    setModalErrorVisible(false);

  };

  return isAuthenticated ? (
    <Outlet />
  ) : modalErrorVisible ? (
    <ErrorComponent title={titleError} message={error} onClose={closeModal} />
    ) : (
      <Navigate to="/admin" replace />
  );
};

export default ProtectedRoutes;
