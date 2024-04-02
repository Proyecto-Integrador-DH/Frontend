import React from "react";
import Frame from "../../assets/Frame.png";
import Copyright from "../../assets/SoloAventuras.png";
import './footerStyle.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="parte1 md:flex-row md:m-0 lg:mt-10">
        <div className="primeraColumna md:w-1/3">
          <img src={Frame} alt="" />
          <p>
            Somos una plataforma latina que promueve Tours y experiencias para
            personas solas. ¿Necesitas inspiración? Aquí te recomendamos
            destinos emocionantes.
          </p>
        </div>
        <div className="segundaColumna mt-3 md:w-2/4">
          <div className="about">
            <h4>Menú</h4>
            <ul className="ul">
              <li>
                <Link to='/' onClick={scrollToTop}>Home</Link>
              </li>
              <li>
                <Link to='/ours'>Nosotros</Link>

              </li>

            </ul>
          </div>
          <div className="products">
            <h4>Experiencias</h4>
            <ul className="ul">
              <li>
                <Link to="/listarProductos/1">Ciudad y noche</Link>
              </li>
              <li>
                <Link to="/listarProductos/2">Aventura y naturaleza</Link>
              </li>
              <li>
                <Link to="/listarProductos/3">Cultura y patrimonio</Link>
              </li>
              <li>
                <Link to="/listarProductos/4">Bienestar y coaching</Link>
              </li>
            </ul>
          </div>
          <div className="other">
            <h4>Otros</h4>
            <ul className="ul">
              <li>
                <Link to="/contact">Contactanos</Link>
              </li>
              <li>
                <Link to="/politicas">Políticas</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="parte2">
        <img src={Copyright} alt="" className="w-2/4 h-2/4 pt-2 md:w-1/4 md:h-3/4 lg:w-1/6 md:pl-1 lg:pl-2"/>
        <div className="footer-social w-4/4 md:w-1/4">
          <a href="https://www.facebook.com/SoloAventuraDH/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} className="mx-1 h-8" /></a>
          <a href="https://twitter.com/Hugo3802128953/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare} className="mx-1 twitter h-8" /></a>
          <a href="https://www.instagram.com/soloaventurasdh/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagramSquare} className="mx-1 h-8" /></a>
        </div>
      </div>
    </>
  );
};

export default Footer;
