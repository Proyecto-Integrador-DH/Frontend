import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategorias } from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Searcher.module.css"
import moment from "moment";

function SearchForm() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const history = useNavigate();
  const calendarRef = useRef(null);
  const [criterio, setCriterio] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const palabras = [
    "hotel",
    "rural",
    "playa",
    "montaña",
    "aventura",
    "ciudad",
    "spa",
    "buceo",
    "tango",
    "Colombia",
    "Argentina",
    "noche",
    "día",
    "relax",
    "naturaleza",
    "cultural",
    "histórico",
    "Bolivia",
    "mar",
    "sol",
    "arena",
    "montaña",
    "glamping",
  ];

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

  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setShowCalendar(false);
  };

  const handleError = (title, message) => {
    setTitleError(title);
    setError(message);
    setModalErrorVisible(true);
  };

  const handleSearchClick = () => {
    if (!criterio) {
      handleError("Error", "Por favor ingresa un criterio de búsqueda.");
      return;
    }
    if (!endDate || !startDate) {
      handleError(
        "Error",
        "Por favor selecciona una fecha de inicio y una fecha final para buscar."
      );
      return;
    }
    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    const formattedEndDate = endDate
      ? moment(endDate).format("YYYY-MM-DD")
      : null;
    history(
      `/search?start=${formattedStartDate}&end=${formattedEndDate}&criteria=${encodeURIComponent(
        criterio
      )}`
    );
  };

  const closeModal = () => {
    setModalErrorVisible(false);
  };

  const handleCriterioChange = (event) => {
    const inputValue = event.target.value;
    setCriterio(inputValue);
  
    const filteredSuggestions = palabras.filter((palabra) =>
      palabra.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(inputValue.trim() !== "" && filteredSuggestions.length > 0);
  };
  
  const filteredSuggestions = useMemo(() => {
    const inputValue = criterio.trim().toLowerCase();
    return palabras.filter((palabra) =>
      palabra.toLowerCase().includes(inputValue)
    );
  }, [criterio]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredSuggestions.length > 0) {
      setCriterio(filteredSuggestions[selectedIndex]);
      setSelectedIndex(-1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCriterio(suggestion);
    setSelectedIndex(-1);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="w-screen mx-auto bg-transparent rounded-lg shadow-lg p-4">
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <h2 className="titu text-xl font-semibold">Buscar Experiencias</h2>
      <p className="text-gray-600 mb-4">
        {isFocused &&
          "Ingresa las palabras clave y fechas para que hagas match con una experiencia"}
      </p>
      <form className="mb-4 flex flex-wrap justify-center items-center">
        <div className="mb-2 mr-2 relative">
          <input
            type="text"
            id="criterio"
            value={criterio}
            onChange={handleCriterioChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            required
            className="capitalize block w-56 px-3 py-2 border rounded-md focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
          />
          {showSuggestions && (
            <ul className="absolute left-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedIndex === index ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={style.date}>
          <label className="custom block" ref={calendarRef}>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={handleRangeChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              monthsShown={2}
              open={showCalendar}
              onClickOutside={() => setShowCalendar(false)}
              onFocus={() => setShowCalendar(true)}
              dateFormat={"dd/MM/yyyy"}
            />
          </label>
        </div>
        <div className="mb-2">
          <button
            type="button"
            onClick={handleSearchClick}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Realizar Búsqueda
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
