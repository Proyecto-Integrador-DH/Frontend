import React, { useState, useEffect } from "react";
import { fetchCategorias, fetchSearch } from "../../services/api";

function SearchForm() {
  const [categoryId, setCategoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [suggestedCategories, setSuggestedCategories] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (category) => category.nombre.toLowerCase().includes(categoryId.toLowerCase()) 
    );
    if (selectedCategory) {
      const categoryId = selectedCategory.id;
      console.log("Category ID:", categoryId);
      const onSearch = async (categoryId, startDate, endDate) => {
        console.log("Search criterio:", categoryId, startDate, endDate);
        try {
          const response = await fetchSearch(categoryId, startDate, endDate);
          console.log("Search results:", response);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      await onSearch(categoryId, startDate, endDate);
    } else {
      console.log("No se encontró una categoría con ese nombre:", categoryId);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <input type="text" value={categoryId} onChange={handleCategoryChange} />
        <ul>
          {suggestedCategories.map((category) => (
            <li key={category.id}>{category.name}</li>
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
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
