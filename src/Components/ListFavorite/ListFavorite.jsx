// ListFavorite.js
import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import { fetchListarFavoritosCliente } from "../../services/api";
import FavoriteButton from "../Favorite/Favorite";

const ListFavorite = ({ clienteId }) => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetchFavoritos();
  }, [clienteId]);

  const fetchFavoritos = () => {
    fetchListarFavoritosCliente(clienteId)
      .then((data) => {
        console.log("Favoritos", data);
        setFavoritos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const handleFavoriteRemoved = () => {
      fetchFavoritos();
    };

    document.addEventListener("favoriteRemoved", handleFavoriteRemoved);

    return () => {
      document.removeEventListener("favoriteRemoved", handleFavoriteRemoved);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Tus Experiencias Favoritas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-5">
        {favoritos.map((favorito) => (
          <div key={favorito.id} className="border rounded p-4 relative">
            {favorito.producto &&
              favorito.producto.imagenes &&
              favorito.producto.imagenes[0] && (
                <img
                  src={favorito.producto.imagenes[0].url}
                  className="object-cover h-40 w-full mb-4"
                  alt={favorito.producto.nombre}
                />
              )}
            <div className="relative">
              <h3 className="text-lg font-bold mb-2">
                {favorito.producto && favorito.producto.nombre}
              </h3>
              <div className="absolute top-0 right-0">
                {favorito.producto && (
                  <FavoriteButton
                    clienteId={clienteId}
                    productoId={favorito.producto.Id}
                  />
                )}
              </div>
            </div>
            <p className="text-sm mb-4 text-justify">
              {favorito.producto && favorito.producto.descripcion}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ListFavorite;
