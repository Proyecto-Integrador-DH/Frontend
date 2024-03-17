import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import { fetchSearch } from "../../services/api";
import FavoriteButton from "../Favorite/Favorite";
import { useSearchParams } from "react-router-dom";
import formatDate from "../../utils/FormatDate";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Buscando productos con los siguientes parámetros", {
          categoryId,
          startDate,
          endDate,
        });
        const data = await fetchSearch(Number(categoryId), startDate, endDate);
        console.log("Resultados de búsqueda", data);
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categoryId, startDate, endDate]);

  return (
    <div className="overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Resultados de la búsqueda</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-5">
        {results.map((result) => (
          <div key={result.id} className="border rounded p-4 relative">
            {result.producto &&
              result.producto.imagenes &&
              result.producto.imagenes[0] && (
                <img
                  src={result.producto.imagenes[0].url}
                  className="object-cover h-40 w-full mb-4"
                  alt={result.producto.nombre}
                />
              )}
            <div className="relative">
              <h3 className="text-lg font-bold mb-2">
                {result.producto && result.producto.nombre}
              </h3>
              <p className="text-sm mb-2">Fecha de ida: {formatDate(result.fechaIda)}</p>
              <p className="text-sm mb-2">
                Fecha de vuelta: {formatDate(result.fechaVuelta)}
              </p>
              <p className="text-sm mb-2">
                Cupos disponibles: {result.cupos}
              </p>
            </div>
            <p className="text-sm mb-4 text-justify">
              {result.producto && result.producto.descripcion}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
