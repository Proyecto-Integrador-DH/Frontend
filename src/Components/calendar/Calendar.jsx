import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchListarAgendaProducto } from "../../services/api";
import { isValid, isAfter, format, isSameDay } from "date-fns";
import ErrorComponent from "../error/ErrorAlert";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Agenda = ({ productoId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [agenda, setAgenda] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [cuposDisponibles, setCuposDisponibles] = useState(null);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgendaExperiencia();
  }, [productoId]);

  const fetchAgendaExperiencia = async () => {
    try {
      setLoading(true);
      const response = await fetchListarAgendaProducto(Number(productoId));
      const fechas = response.map((item) => ({
        id: item.id,
        fechaIda: new Date(item.fechaIda),
        fechaVuelta: new Date(item.fechaVuelta),
        cupos: item.cupos,
        producto: item.producto,
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
      setAgenda(filteredAgenda);
    } catch (error) {
      console.error("Error al obtener la agenda:", error);
    } finally {
      setLoading(false);
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
    if (!agenda.length) {
      setShowCalendar(false);
      setModalErrorVisible(true);
      setTitleError("Error");
      setError(
        "Error al obtener la agenda de la experiencia. Intente nuevamente más tarde."
      );
    }
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
        className={`p-4 bg-gradient-to-br from-purple-300 to-pink-300 text-black shadow-lg ${className}`}
      >
        <div className="bg-gradient-to-br from-purple-300 to-pink-300"></div>
        <div className="relative">{children}</div>
      </div>
    );
  };

  const handleDateChange = (date) => {
    const cuposDisponibles = agenda.find(
      (item) =>
        isSameDay(item.fechaIda, date) || isSameDay(item.fechaVuelta, date)
    );
    setCuposDisponibles(cuposDisponibles ? cuposDisponibles.cupos : null);
    setStartDate(date);
    setSelectedDate(date);
  };

  const handleReservar = () => {
    if (!token) {
      history("/Login");
    } else {
      const agendaSeleccionada = agenda.find(
        (item) =>
          isSameDay(item.fechaIda, selectedDate) ||
          isSameDay(item.fechaVuelta, selectedDate)
      );
      if (!agendaSeleccionada) {
        setModalErrorVisible(true);
        setTitleError("Error");
        setError("Debe seleccionar una fecha disponible");
        return;
      }
      history(`/reserva?agenda=${encodeURIComponent(JSON.stringify(agendaSeleccionada))}`);
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="mb-2 mr-2">
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <button
        onClick={toggleCalendar}
        className="bg-purple-600 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 text-white rounded-md px-4 py-2 transition-colors duration-300 ease-in-out"
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
            inline
            customInput={<CustomInput />}
            open={showCalendar}
            calendarContainer={MyContainer}
            renderCustomHeader={({
              monthDate,
              customHeaderCount,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  style={
                    customHeaderCount === 1 ? { visibility: "hidden" } : null
                  }
                  onClick={decreaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {monthDate.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  style={
                    customHeaderCount === 0 ? { visibility: "hidden" } : null
                  }
                  onClick={increaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </div>
            )}
            onChange={handleDateChange}
          >
            {cuposDisponibles !== null && (
              <pc className="m-auto text-lg">
                Cupos disponibles: {cuposDisponibles}
              </pc>
            )}
            <hr className="m-2" />
            <button
              className="text-lg bg-purple-600 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 text-white rounded-md px-4 py-2 transition-colors duration-300 ease-in-out"
              onClick={handleReservar}
            >
              Reservar
            </button>
          </DatePicker>
        </label>
      )}
    </div>
  );
};

export default Agenda;
