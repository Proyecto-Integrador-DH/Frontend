{/*import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./ModalCalendar";
import CalendarStyles from "./Calendar.module.css";

const Agenda = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    fetchReservedDates();
  }, []);

  const fetchReservedDates = async () => {
    // Simulamos la obtención de las fechas reservadas desde el servidor
    // Por ahora, simplemente usamos un conjunto de fechas fijas
    const dates = [new Date(), new Date()];
    setReservedDates(dates);
  };

  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReservation = async () => {
    try {
      // Simulación de la reserva (mock)
      const reservation = { startDate, endDate };
      console.log("Reserva realizada:", reservation);

      // Agregar las fechas reservadas recién seleccionadas a la lista de fechas reservadas
      const newReservedDates = [...reservedDates];
      for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
        newReservedDates.push(new Date(d));
      }
      setReservedDates(newReservedDates);

      // Limpiar los campos de fecha después de la reserva
      setStartDate(null);
      setEndDate(null);

      // Cerrar el modal después de la reserva
      handleCloseModal();
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
    }
  };

  return (
    <div>
      <button className={CalendarStyles.reservarButton} onClick={handleOpenModal}>Reservar</button>
      <Modal className={CalendarStyles.calendarContainer} isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Seleccionar rango de fechas:</h2>
        <div className={CalendarStyles.calendarInput}>
          <DatePicker
            className={CalendarStyles.dateBox}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Seleccione un rango de fechas"
            excludeDates={reservedDates} // Excluye fechas reservadas del calendario
            monthsShown={2}
            inline
          />
        </div>
        <div className={CalendarStyles.buttonsCalendar}>
          <button onClick={handleReservation}>Reservar</button>
          <button onClick={handleCloseModal}>Cerrar sin reservar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Agenda;

{/*import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoubleCalendarPicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateClick = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div>
      <input
        type="text"
        onClick={handleDateClick}
        placeholder="Seleccione un rango de fechas"
        readOnly
      />
      {showPicker && (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          inline
        />
      )}
    </div>
  );
};

export default DoubleCalendarPicker;*/}

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./ModalCalendar";
import CalendarStyles from "./Calendar.module.css";

const Agenda = ({ fechaInicio, fechaFin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    fetchReservedDates();
  }, []);

  const fetchReservedDates = async () => {
    // Simulamos la obtención de las fechas reservadas desde el servidor
    // Por ahora, simplemente usamos un conjunto de fechas fijas
    const dates = [new Date(), new Date()];
    setReservedDates(dates);
  };

  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReservation = async () => {
    try {
      // Simulación de la reserva (mock)
      const reservation = { startDate, endDate };
      console.log("Reserva realizada:", reservation);

      // Agregar las fechas reservadas recién seleccionadas a la lista de fechas reservadas
      const newReservedDates = [...reservedDates];
      for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
        newReservedDates.push(new Date(d));
      }
      setReservedDates(newReservedDates);

      // Limpiar los campos de fecha después de la reserva
      setStartDate(null);
      setEndDate(null);

      // Cerrar el modal después de la reserva
      handleCloseModal();
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
    }
  };

  return (
    <div>
      <button className={CalendarStyles.reservarButton} onClick={handleOpenModal}>Reservar</button>
      <Modal className={CalendarStyles.calendarContainer} isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Seleccionar rango de fechas:</h2>
        <div className={CalendarStyles.calendarInput}>
          <DatePicker
            className={CalendarStyles.dateBox}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Seleccione un rango de fechas"
            excludeDates={reservedDates} // Excluye fechas reservadas del calendario
            monthsShown={2}
            inline
            minDate={fechaInicio} // Establece la fecha mínima seleccionable
            maxDate={fechaFin} // Establece la fecha máxima seleccionable
          />
        </div>
        <div className={CalendarStyles.buttonsCalendar}>
          <button onClick={handleReservation}>Reservar</button>
          <button onClick={handleCloseModal}>Cerrar sin reservar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Agenda;