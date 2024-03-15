import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchProduct,
  fetchAddFavoritos,
  fetchRemoveFavoritos,
  fetchCheckFavoritos,
} from "../services/api";
import Searcher from "../Components/searcher/Searcher";
import flecha from "../assets/arrowRightflecha.png";
import "./details.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Details = ({ clienteId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detallesProducto, setDetallesProducto] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const defaultImage = "https://via.placeholder.com/150";
  const totalImage = 4;

  const fetchDetallesProductos = async () => {
    try {
      const data = await fetchProduct(id);
      setDetallesProducto(data);
      if (clienteId) {
        const isFav = await fetchCheckFavoritos(clienteId, id);
        console.log("isFav", isFav);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const missingImagesCount = Math.max(
    totalImage - (detallesProducto?.imagenes?.length ?? 0),
    0
  );
  const missingImagesArray = new Array(missingImagesCount).fill(defaultImage);

  const allImages = detallesProducto?.imagenes
    ?.slice(1, 5)
    .concat(missingImagesArray);

  const handleToggleFavorite = async () => {
    try {
      const productoId = id;
      const favorito = {
        cliente: { id: clienteId },
        producto: { Id: productoId },
      };

      if (isFavorite) {
        await fetchRemoveFavoritos(favorito);
        console.log("Producto eliminado de favoritos");
      } else {
        await fetchAddFavoritos(favorito);
        console.log("Producto agregado a favoritos");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
    }
  };

  useEffect(() => {
    fetchDetallesProductos();
  }, []);

  return (
    <>
      <Searcher />
      <div className="flex flex-col items-center my-10">
        <p className="text-rosa font-bold tracking-widest text-2xl mb-5">
          NUESTROS
        </p>
        <h1 className="text-3xl font-bold tracking-wide">
          Tours & experiencias
        </h1>
      </div>

      <div className="imageContainer">
        <div className="favoriteIcon" onClick={handleToggleFavorite}>
          {isFavorite ? (
            <FaHeart color="red" size={32} />
          ) : (
            <FaRegHeart size={32} />
          )}
        </div>
        {/* Imagen principal grande a la izquierda */}
        <div className="imagenIzquierda">
          {detallesProducto?.imagenes?.length > 0 ? (
            <img
              src={detallesProducto.imagenes[0]?.url}
              alt={`Imagen principal`}
            />
          ) : (
            <img src={defaultImage} alt="Imagen por defecto" />
          )}
        </div>

        {/* Cuadrícula de imágenes más pequeñas a la derecha */}
        <div className="cuadriculaImagenes">
          {allImages &&
            allImages.map((imagen, index) => (
              <img key={index} src={imagen.url} alt={`Imagen ${index + 1}`} />
            ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8">
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold text-rosa mb-2">
            Detalles de la Experiencia
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-rosa mb-4">
              {detallesProducto?.nombre}
            </h2>
            <p>{detallesProducto?.descripcion}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-end">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center"
              >
                <img src={flecha} alt="Volver" className="w-6 h-6 mr-2" />
                <span className="text-gray-400">Volver</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
