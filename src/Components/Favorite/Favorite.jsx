import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { fetchAddFavoritos, fetchRemoveFavoritos, fetchCheckFavoritos } from "../../services/api";

const FavoriteButton = ({ clienteId, productoId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const isFav = await fetchCheckFavoritos(Number(clienteId), Number(productoId));
        console.log("isFav", isFav);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error al verificar favoritos:", error);
      }
    };

    if (clienteId && productoId) {
      checkFavoriteStatus();
    }
  }, [clienteId, productoId]);

  const handleToggleFavorite = async () => {
    try {
      const favorito = {
        cliente: { id: clienteId },
        producto: { Id: productoId },
      };

      if (isFavorite) {
        await fetchRemoveFavoritos(favorito);
        console.log("Producto eliminado de favoritos");
        document.dispatchEvent(new Event("favoriteRemoved"));
      } else {
        await fetchAddFavoritos(favorito);
        console.log("Producto agregado a favoritos");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
    }
  };

  return (
    <div className="favoriteIcon" onClick={handleToggleFavorite}>
      {isFavorite ? <FaHeart color="red" size={32} /> : <FaRegHeart size={32} />}
    </div>
  );
};

export default FavoriteButton;
