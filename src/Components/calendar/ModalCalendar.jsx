import React from "react";
import ModalCalendarSyles from "./ModalCalendar.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={ModalCalendarSyles.modalContainer}>
      <div className={ModalCalendarSyles.modalDate}>
        {children}
      </div>
    </div>
  );
};

export default Modal;