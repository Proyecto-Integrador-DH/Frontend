import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  fetchAddFavoritos,
  fetchRemoveFavoritos,
  fetchCheckFavoritos,
} from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";

const FavoriteButton = ({ clienteId, productoId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const isFav = await fetchCheckFavoritos(
          Number(clienteId),
          Number(productoId)
        );
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
      if (!clienteId || !productoId) {
        setTitleError("Información");
        setError(
          "Actualmente no se puede agregar a favoritos, completa tus datos e intenta nuevamente."
        );
        setModalErrorVisible(true);
      }
      if(!token){
        setTitleError("Información");
        setError(
          "Debes iniciar sesión para agregar a favoritos."
        );
        setModalErrorVisible(true);
      }
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

  const closeModal = () => {
    console.log("closeModal");
    setModalErrorVisible(false);
  };

  return (
    <div>
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <div className="favoriteIcon" onClick={handleToggleFavorite}>
        {isFavorite ? (
          <FaHeart color="red" size={32} />
        ) : (
          <FaRegHeart size={32} />
        )}
      </div>
    </div>
  );
};

export default FavoriteButton;
