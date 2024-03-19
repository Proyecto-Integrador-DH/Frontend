import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MenuHamburguesa = ({ user, onLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className="relative mr-5">
      {/* Botón del menú hamburguesa */}
      <button
        onClick={toggleMenu}
        className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:text-gray-900 hover:border-gray-900"
      >
        <svg
          className="fill-current h-5 w-5"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {/* Menú desplegable */}
      <div
        className={`${
          menuAbierto ? 'block' : 'hidden'
        } absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20`}
      >
        <div className="py-1">
          {user ? (
            <button
              onClick={onLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link
                to="/Login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/crearUsuario"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Crear Cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuHamburguesa;