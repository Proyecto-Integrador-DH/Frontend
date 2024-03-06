import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



const Avatar = ({user, onLogout}) => {
  const [estado, setEstado] = useState(false);
  const inicialNombre = user ? user.nombre[0] : "Usuario";
  const inicialApellido = user ? user.apellido[0] : "Anónimo";
  const nombreAvatar = inicialNombre + inicialApellido;
  
  const generarColor = () => {
    const charCodeRed = inicialNombre.charCodeAt(0);
    const charCodeGreen = inicialApellido.charCodeAt(0);

    const rojo = Math.pow(charCodeRed, 7) % 200;
    const verde = Math.pow(charCodeGreen, 7) % 200;
    const azul = (charCodeRed + charCodeGreen) % 200;
    const color = `rgb(${rojo}, ${verde}, ${azul})`;
    return color;

  }
  const color = generarColor();

  return (
    <div>
      <div className="relative ml-3">
        <div>
          <button
            type="button"
            className="relative flex rounded-full mt-3 mr-20  bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded={estado}
            aria-haspopup="true"
            onClick={() => setEstado(!estado)}
          >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            <p style={{backgroundColor: color}} className="h-12 w-12 text-lg pt-2.5 text-white text-center align-middle rounded-full">{nombreAvatar}</p>
          </button>
        </div>

        {estado && (
          
          <div
          className="absolute right-0 z-10 mt-2 mr-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
          
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 font-bold"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-0"
          >
            {user ? user.nombre + " " + user.apellido : "Usuario Anónimo"}
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-0"
          >
            {user.email}
          </a>

         {/*  <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-1"
          >
            Panel de Administracion
          </a> */}
           <Link to={"/admin"} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2"> 
            Panel de administracion
            </Link>
           <a
            onClick={onLogout}
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-2"
            >
            Cerrar Sesión
          </a>
        </div>
            )}
      </div>
    </div>
  );
};

export default Avatar;
