import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Listfavorite.module.css";
import Footer from "../footer/Footer";
import { fetchListarFavoritosCliente } from "../../services/api";

const ListFavorite = ({clienteId}) => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetchListarFavoritosCliente(clienteId)
      .then((data) => {
        console.log("Favoritos", data);
        setFavoritos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });



  return (
    <div className="overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Lista de Experiencias Favoritas</h2>

      <div className="overflow-x-auto">
        <table className="whitespace-nowrap table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la Experiencia</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>

          
      </tbody>
    </table>
      </div >

    </div >
  );
};

export default ListFavorite;
