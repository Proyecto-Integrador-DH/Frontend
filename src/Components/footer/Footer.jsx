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
            <h4>About</h4>
            <ul className="ul">
              <li>How to book</li>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Career</li>
            </ul>
          </div>
          <div className="products">
            <h4>Products</h4>
            <ul className="ul">
              <li>Flights</li>
              <li>Hotels</li>
              <li>Trains</li>
              <li>Villas</li>
            </ul>
          </div>
          <div className="other">
            <h4>Other</h4>
            <ul className="ul">
              <li>Blog</li>
              <li>Privacy Notice</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="parte2">
        <img src={Copyright} alt="" />
        <div className="footer-social">
          <FontAwesomeIcon icon={faFacebook}/>
          <FontAwesomeIcon icon={faTwitterSquare} className="twitter" />
          <FontAwesomeIcon icon={faInstagramSquare}/>
        </div>
      </div>
    </>
  );
};

export default Footer;
