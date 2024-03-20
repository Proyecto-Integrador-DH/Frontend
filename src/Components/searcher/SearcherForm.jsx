import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategorias } from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && suggestions.length > 0) {
      setCriterio(suggestions[selectedIndex]);
      setShowSuggestions(false);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCriterio(suggestion);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    const inputValue = criterio.trim().toLowerCase();
    const filteredSuggestions = palabras.filter((palabra) =>
      palabra.toLowerCase().includes(inputValue)
    );
    setShowSuggestions(filteredSuggestions.length > 0);
  };

  const handleBlur = () => {
    setShowSuggestions(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md">
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <h2 className="text-xl font-semibold">Buscar Experiencias</h2>
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
            className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <div className="mb-2 mr-2">
          <label className="block" ref={calendarRef}>
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
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Realizar Búsqueda
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
