import React from "react";
import Footer from "../../Components/footer/Footer";
import Button from "../../Components/button/Button";
import AdminStyle from './Administrador.module.css';
import { Link } from 'react-router-dom';

const Adminstrador = () => {
  return (
    <div>
      <h2 className={AdminStyle.h2}>Panel de administración</h2>
      <h3 className={AdminStyle.h3}>No puedes acceder al panel con un dispositivo móvil</h3>
      <div className={AdminStyle.contenedor}>
        <div className={AdminStyle.tarjetasContainer}>
          <div className={AdminStyle.tarjetas}>
            <h2>Agregar una experiencia</h2>
            <Link to='/registrarProducto'><Button className={AdminStyle.boton}>Clic aquí</Button></Link>
          </div>
          <div className={AdminStyle.tarjetas}>
            <h2>Lista de experiencias</h2>
            <Link to='/listarProductos'><Button className={AdminStyle.boton}>Clic aquí</Button></Link>
          </div>
          <div className={AdminStyle.tarjetas}>
            <h2>Gestionar Agenda</h2>
            <Link to='/agenda'><Button className={AdminStyle.boton}>Clic aquí</Button></Link>
          </div>
        </div>
        <div className={AdminStyle.tarjetasContainer}>
          <div className={AdminStyle.tarjetas}>
            <h2>Lista de Categorías</h2>
            <Link to='/asignarCategoria'><Button className={AdminStyle.boton}>Clic aquí</Button></Link>
          </div>
          <div className={AdminStyle.tarjetas}>
            <h2>Gestionar Usuarios</h2>
            <Link to='/listarUsuarios'><Button className={AdminStyle.boton}>Clic aquí</Button></Link>
          </div>
          <div className={AdminStyle.tarjetas}>
            <h2>Gestionar Reservas</h2>
            <Link to='/'><Button className={AdminStyle.boton}>Clic aquí</Button></Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Adminstrador;
