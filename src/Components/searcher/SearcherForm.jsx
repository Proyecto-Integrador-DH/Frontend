import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategorias } from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function SearchForm() {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [suggestedCategories, setSuggestedCategories] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar si se ha hecho foco en el campo de entrada de palabras clave
  const history = useNavigate();
  let typingTimer;
  const calendarRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const fetchCategories = async () => {
    try {
      const response = await fetchCategorias();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryName(value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      filterCategories(value);
    }, 500);
  };

  const filterCategories = (value) => {
    const suggested = categories.filter(
      (category) =>
        category.nombre &&
        typeof category.nombre === "string" &&
        category.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestedCategories(suggested);
  };

  const handleSuggestionClick = (category) => {
    if (category.id !== null) {
      console.log("category", category);
      setCategoryId(category.id);
      setCategoryName(category.nombre);
      setSuggestedCategories([]);
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
    if (!categoryId) {
      handleError("Error", "Por favor selecciona una categoría para buscar.");
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
      `/search?category=${categoryId}&start=${formattedStartDate}&end=${formattedEndDate}`
    );
  };

  const renderSuggestedCategories = () => {
    return (
      <div className="absolute z-10 mt-12 w-64 bg-white border border-gray-300 rounded-md shadow-sm">
        <ul>
          {suggestedCategories.map((category) => (
            <li
              key={category.id}
              className="capitalize cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSuggestionClick(category)}
            >
              {category.nombre}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const closeModal = () => {
    setModalErrorVisible(false);
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
        {isFocused && "Ingresa las palabras clave y fechas para que hagas match con una experiencia"}
      </p>
      <form className="mb-4 flex flex-wrap justify-center items-center">
        <div className="mb-2 mr-2">
          <input
            type="text"
            id="category"
            value={categoryName}
            onChange={handleCategoryChange}
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)} 
            required
            className="capitalize block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {renderSuggestedCategories()}
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
