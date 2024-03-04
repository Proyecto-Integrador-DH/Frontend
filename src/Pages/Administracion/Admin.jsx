import React from "react";
import Footer from "../../Components/footer/Footer";
import Button from "../../Components/button/Button";
import AdminStyle from './Administrador.module.css';
import { Link } from 'react-router-dom';


const Adminstrador = () => {


  return (
    <div>

      <h2 className={AdminStyle.h2}> Panel de administracion</h2>

      <div className={AdminStyle.contarjetas}>

        <div className={AdminStyle.tarjetas}>
          <h2>Agregar un producto</h2>
          <Link to='/registrarProducto' > <Button className={AdminStyle.boton}>Clik aqui </Button></Link>
        </div>


        <div className={AdminStyle.tarjetas}>
          <h2>Lista de productos</h2>
          <Link to='/listarProductos' ><Button className={AdminStyle.boton}>Click aqui</Button></Link>
        </div>

        <div className={AdminStyle.tarjetas}>
          <h2>Lista de Categorias</h2>
          <Link to='/asignarCategoria'><Button className={AdminStyle.boton}>Click aqui</Button></Link>
        </div>

        <div className={AdminStyle.tarjetas}>
          <h2>Listar Usuarios</h2>
          <Link to='/listarUsuarios'><Button className={AdminStyle.boton}>Click aqui</Button></Link>
        </div>

      </div>


      <Footer />
    </div>

  )
}

export default Adminstrador