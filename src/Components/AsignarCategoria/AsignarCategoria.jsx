import React, { useState, useEffect } from "react";
import { fetchCategorias } from "../../services/api";

const AsignarCategoria = () => {
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    fetchCategorias()
      .then((data) => {
        setCategoria(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      });
  }, []);

  return (
    <div className="overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Lista de categorias</h2>
      <div className="overflow-x-auto">
        <table className="max-w-m whitespace-nowrap table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la experiencia</th>
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
