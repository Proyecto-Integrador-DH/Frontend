import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategorias } from "../../services/api";
import SearchResults from "./ListSearcher";

function SearchForm() {
  const [categoryId, setCategoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [suggestedCategories, setSuggestedCategories] = useState([]);
  const history = useNavigate(); 

  useEffect(() => {
    fetchCategories();
  }, []);

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
    setCategoryId(value);
    const suggested = categories.filter(
      (category) =>
        category.nombre &&
        typeof category.nombre === "string" &&
        category.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestedCategories(suggested);
  };

  const handleSuggestionClick = (category) => {
    setCategoryId(category.id); // Aquí establecemos el ID en lugar del nombre
    setSuggestedCategories([]);
  };

  const handleSearchClick = () => {
    history(`/search?categoryId=${categoryId}&startDate=${startDate}&endDate=${endDate}`);
  };

  return (
    <form>
      <label>
        Category:
        <input type="text" value={categoryId} onChange={handleCategoryChange} />
        <ul>
          {suggestedCategories.map((category) => (
            <li
              key={category.id}
              className="capitalize"
              onClick={() => handleSuggestionClick(category)}
            >
              {category.nombre}
            </li>
          ))}
        </ul>
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <div className="flex justify-end">
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </form>
  );
}

export default SearchForm;
