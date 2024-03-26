import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import { fetchListarFavoritosCliente } from "../../services/api";
import FavoriteButton from "../Favorite/Favorite";
import card from "../Card/Card.jsx";
import Card from "../Card/Card.jsx";

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
      <div className="grid grid-cols-2 gap-6 m-5">
        {favoritos.map((favorito) => (
          <div
            key={favorito.id} className="border rounded-lg p-4 relative bg-white shadow-md">
            {favorito.producto && (
              <Card producto={favorito.producto}/>
             )}
              <div className="flex justify-between mt-4">
                  <FavoriteButton clienteId={clienteId} productoId={favorito.producto.Id} />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ListFavorite;
