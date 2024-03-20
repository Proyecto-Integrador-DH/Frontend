import React from "react";
import Frame from "../../assets/Frame.png";
import Copyright from "../../assets/SoloAventuras.png";
import './footerStyle.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

const Footer= () => {
  return (
    <>
      <div className="parte1">
        <div className="primeraColumna">
          <img src={Frame} alt="" />
          <p>
            Somos una plataforma latina que promueve Tours y experiencias para
            personas solas. ¿Necesitas inspiración? Aquí te recomendamos
            destinos emocionantes.
          </p>
        </div>
        <div className="segundaColumna">
          <div className="about">
            <h4>Menú</h4>
            <ul className="ul">
              <li>Home</li>
              <li>Reservas</li>
              <li>Detalles</li>
            </ul>
          </div>
          <div className="products">
            <h4>Experiencias</h4>
            <ul className="ul">
              <li>Ciudad y noche</li>
              <li>Aventura y naturaleza</li>
              <li>Cultura y patrimonio</li>
              <li>Bienestar y coaching</li>
            </ul>
          </div>
          <div className="other">
            <h4>Otros</h4>
            <ul className="ul">
              <li>Contáctanos</li>
              <li>Políticas</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="parte2">
        <img src={Copyright} alt="" />
        <div className="footer-social">
        <a href="https://www.facebook.com/SoloAventuraDH/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} className="h-6"/></a>
        <a href="https://twitter.com/Hugo3802128953/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare} className="twitter h-6" /></a>
        <a href="https://www.instagram.com/soloaventurasdh/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagramSquare} className="h-6" /></a>

        </div>
      </div>
    </>
  );
};

export default Footer;
