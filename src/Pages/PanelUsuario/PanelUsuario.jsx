import React from "react";
import Footer from "../../Components/footer/Footer";
import Button from "../../Components/button/Button";
import AdminStyle from "./PanelUsuario.module.css";
import { Link } from "react-router-dom";

const PanelUsuario = () => {
  return (
    <div>
      <h2 className={AdminStyle.h2}>Preferencias de Usuario</h2>
      <h3 className={AdminStyle.h3}>
        No puedes acceder al panel con un dispositivo móvil
      </h3>
      <div className={AdminStyle.contenedor}>
        <div
          className={`${AdminStyle.tarjetasContainer} grid grid-col-1 md:flex`}
        >
          <div className={AdminStyle.tarjetas}>
            <h2>Listar Reservas</h2>
            <Link to="/reservas">
              <Button className={AdminStyle.boton}>Clic aquí</Button>
            </Link>
          </div>
          <div className={AdminStyle.tarjetas}>
            <h2>Lista de favoritos</h2>
            <Link to="/listarFavoritos">
              <Button className={AdminStyle.boton}>Clic aquí</Button>
            </Link>
          </div>
          <div className={AdminStyle.tarjetas}>
            <h2>Actualizar Datos</h2>
            <Link to="/cliente">
              <Button className={AdminStyle.boton}>Clic aquí</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default PanelUsuario;
