import React, { useState, useEffect } from "react";
import { fetchCategorias } from "../../services/api";
import Loading from "../Loading/Loading";

const AsignarCategoria = () => {
  const [categorias, setCategoria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategorias()
      .then((data) => {
        setLoading(true);
        setCategoria(data);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-[90vw] mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-6">Lista de categorias</h2>
      <div className="">
        <table className="max-w-m whitespace-nowrap table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la categoría</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td className="capitalize">{categoria.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsignarCategoria;
