import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Solologo from "../../assets/Solologo.png";
import style from "./WhatsApp.module.css";

const WhatsAppFloatingButton = () => {

  return (
    <FloatingWhatsApp
      avatar={Solologo}
      accountName="Solo Aventuras"
      phoneNumber="573023437366"
      statusMessage="Estamos en línea"
      chatMessage="Hola! Somos Solo Aventuras, queremos que hagas match con tu próxima experiencia. ¿En qué podemos ayudarte?"
      placeholder="Escribe tu mensaje aquí"
      chatboxStyle={style}
      buttonClassName={style.button}
    />
  );
};

export default WhatsAppFloatingButton;
