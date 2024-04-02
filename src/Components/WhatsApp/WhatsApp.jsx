import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Solologo from "../../assets/Solologo.png";
import style from "./WhatsApp.module.css";
import { useMediaQuery } from 'react-responsive';

const WhatsAppFloatingButton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const button = isMobile ? style.buttonMobile : style.button;

  return (
    <FloatingWhatsApp
      avatar={Solologo}
      accountName="Solo Aventuras"
      phoneNumber="573023437366"
      statusMessage="Estamos en línea"
      chatMessage="Hola! Somos Solo Aventuras, queremos que hagas match con tu próxima experiencia. ¿En qué podemos ayudarte?"
      placeholder="Escribe tu mensaje aquí"
      chatboxStyle={style}
      buttonClassName={button}
    />
  );
};

export default WhatsAppFloatingButton;
