import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchListarAgendaProducto } from "../../services/api";
import { isValid, isAfter, format } from "date-fns";

const Agenda = ({ productoId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [agenda, setAgenda] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    fetchAgendaExperiencia();
  }, [productoId]);

  const fetchAgendaExperiencia = async () => {
    try {
      const response = await fetchListarAgendaProducto(Number(productoId));
      const fechas = response.map((item) => ({
        fechaIda: new Date(item.fechaIda),
        fechaVuelta: new Date(item.fechaVuelta),
        cupos: item.cupos,
      }));
      const fechaHoy = new Date();
      const agendaFechas = fechas.filter(
        (experiencia) =>
          isValid(experiencia.fechaIda) &&
          isAfter(experiencia.fechaIda, fechaHoy) &&
          experiencia.cupos > 0
      );
      const filteredAgenda = [];
      const seenDates = new Set();
      agendaFechas.forEach((experiencia) => {
        const key = experiencia.fechaIda.getTime();
        if (!seenDates.has(key)) {
          filteredAgenda.push(experiencia);
          seenDates.add(key);
        }
      });

      console.log("Agenda", filteredAgenda);
      setAgenda(filteredAgenda);
    } catch (error) {
      console.error("Error al obtener la agenda:", error);
      // Aquí podrías agregar alguna notificación para el usuario sobre el error.
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar((prevShowCalendar) => !prevShowCalendar);
  };

  const CustomInput = ({ value, onClick }) => (
    <button
      className="flex items-center justify-center rounded-md bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 text-white px-4 py-2 transition-colors duration-300 ease-in-out"
      onClick={onClick}
    >
      {format(value, "dd-MM-yyyy")}
    </button>
  );

  const MyContainer = ({ className, children }) => {
    return (
      <div
        className={className}
        style={{ padding: "16px", background: "#FFF8FE", color: "black" }}
      >
        <div style={{ background: "#FFF8FE" }}></div>
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    );
  };

  return (
    <div className="mb-2 mr-2">
      <button
        onClick={toggleCalendar}
        className="bg-purple-400 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 text-white rounded-md px-4 py-2 transition-colors duration-300 ease-in-out"
      >
        Ver Disponibilidad
      </button>
      {showCalendar && (
        <label className="block mt-2" ref={calendarRef}>
          <DatePicker
            showIcon
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            monthsShown={2}
            onClickOutside={() => setShowCalendar(false)}
            onFocus={() => setShowCalendar(true)}
            dateFormat={"dd/MM/yyyy"}
            includeDates={agenda.flatMap((item) => [
              item.fechaIda,
              item.fechaVuelta,
            ])}
            customInput={<CustomInput />}
            inline
            open={showCalendar}
            calendarContainer={MyContainer}
          />
        </label>
      )}
    </div>
  );
};

export default Agenda;
