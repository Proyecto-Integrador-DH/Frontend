import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchListarAgendaProducto } from "../../services/api";
import { isValid, isAfter, isSameDay, format } from "date-fns";

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

  const renderCustomHeader = ({ cupos }) => {
    return (
      <div>
        <span>Cupos disponibles: {cupos}</span>
      </div>
    );
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  return (
    <div className="mb-2 mr-2">
      <label className="block" ref={calendarRef}>
        <DatePicker
          showIcon
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          monthsShown={2}
          open={showCalendar}
          onClickOutside={() => setShowCalendar(false)}
          onFocus={() => setShowCalendar(true)}
          dateFormat={"dd/MM/yyyy"}
          includeDates={agenda.flatMap((item) => [item.fechaIda, item.fechaVuelta])}
          renderCustomHeader={({ date }) => {
            const item = agenda.find((agendaItem) => isSameDay(agendaItem.fechaIda, date));
            if (item) return renderCustomHeader(item);
            return null;
          }}
          onChange={handleDateChange}
          inline
        />
      </label>
    </div>
  );
};

export default Agenda;
