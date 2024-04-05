import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import { fetchListarFavoritosCliente } from "../../services/api";
import FavoriteButton from "../Favorite/Favorite";
import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";

const ListFavorite = ({ clienteId }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoritos();
  }, [clienteId]);

  const fetchFavoritos = () => {
    fetchListarFavoritosCliente(clienteId)
      .then((data) => {
        setLoading(true);
        setFavoritos(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
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
  }, [clienteId]);

  if (loading) return <Loading />;

  return (
    <div className="overflow-hidden mt-20 px-4">
      <h2 className="text-3xl font-bold mb-6">Tus Experiencias Favoritas</h2>
      <div className="flex flex-wrap sm:justify-center sm:columns-1 md:columns-2 gap-6 m-5">
        {favoritos.map((favorito) => (
          <div
            key={favorito.id}
            className="sm:w-full md:w-auto border rounded-lg p-4 relative bg-white shadow-md"
            style={{ maxWidth: "540px" }}
          >
            {favorito.producto && <Card producto={favorito.producto} />}
            <div className="flex justify-between mt-4">
              <FavoriteButton
                clienteId={clienteId}
                productoId={favorito.producto.Id}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="xl:absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ListFavorite;
