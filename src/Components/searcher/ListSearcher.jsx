import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import { fetchSearch } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import formatDate from "../../utils/FormatDate";
import flecha from "../../assets/arrowRightflecha.png";
import Loading from "../Loading/Loading";

const ListSearch = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const criteria = searchParams.get("criteria");
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchSearch(startDate, endDate);
        const filteredResults = data.filter((result) => {
          return (
            (result.producto?.nombre || "")
              .toLowerCase()
              .includes((criteria || "").toLowerCase()) ||
            (result.producto?.descripcion || "")
              .toLowerCase()
              .includes((criteria || "").toLowerCase())
          );
        });
        setResults(filteredResults);
        if (filteredResults.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, criteria]);

  if (notFound) {
    return (
      <div className="text-center mt-8">
        <p className="text-xl font-bold">
          No se encontraron resultados para la búsqueda.
        </p>
        <div className="flex flex-col justify-between">
          <div className="flex justify-center m-10">
            <button onClick={() => navigate(-1)} className="flex items-center">
              <img src={flecha} alt="Volver" className="w-6 h-6 mr-2" />
              <span className="text-purple-400">Volver</span>
            </button>
          </div>
        </div>
        <div className="fixed bottom-0">
          <Footer />
        </div>
      </div>
    );
  }

  if (loading) return <Loading />;

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
              <p className="text-sm mb-2">
                Fecha de ida: {formatDate(result.fechaIda)}
              </p>
              <p className="text-sm mb-2">
                Fecha de vuelta: {formatDate(result.fechaVuelta)}
              </p>
              <p className="text-sm mb-2">Cupos disponibles: {result.cupos}</p>
            </div>
            <p className="text-sm mb-4 text-justify">
              {result.producto && result.producto.descripcion}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex justify-center">
          <button onClick={() => navigate(-1)} className="flex items-center">
            <img src={flecha} alt="Volver" className="w-6 h-6 mr-2" />
            <span className="text-purple-400">Volver</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListSearch;
