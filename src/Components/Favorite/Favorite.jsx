import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  fetchAddFavoritos,
  fetchRemoveFavoritos,
  fetchCheckFavoritos,
} from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";
import Loading from "../Loading/Loading";
import { set } from "date-fns";

const FavoriteButton = ({ clienteId, productoId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        setLoading(true);
        const isFav = await fetchCheckFavoritos(
          Number(clienteId),
          Number(productoId)
        );
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error al verificar favoritos:", error);
      } finally {
        setLoading(false);
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
        setLoading(true);
        await fetchRemoveFavoritos(favorito);
        document.dispatchEvent(new Event("favoriteRemoved"));
      } else {
        setLoading(true);
        await fetchAddFavoritos(favorito);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
  };

  if (loading) return <Loading />;

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
