import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { fetchProduct, fetchCheckFavoritos } from "../services/api";
import flecha from "../assets/arrowRightflecha.png";
import Calendar from "../Components/calendar/Calendar";
import "./details.css";
import FavoriteButton from "../Components/Favorite/Favorite";
import CardCaracteristica from "../Components/CardCaracteristica/CardCaracteristica.jsx";
import Politicas from "../Components/Politica/Politicas.jsx";
import Loading from "../Components/Loading/Loading.jsx";

const Details = ({ clienteId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detallesProducto, setDetallesProducto] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mostrarPoliticas, setMostrarPoliticas] = useState(false);
  const defaultImage = "https://via.placeholder.com/150";
  const totalImage = 4;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetallesProductos();
  }, [id]);

  const fetchDetallesProductos = async () => {
    try {
      setLoading(true);
      const data = await fetchProduct(id);
      setDetallesProducto(data);
      if (clienteId) {
        const isFav = await fetchCheckFavoritos(clienteId, id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
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

  const abrirPoliticas = () => {
    setMostrarPoliticas(true);
  };

  const cerrarPoliticas = () => {
    setMostrarPoliticas(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex flex-col items-center my-10">
        <p className="text-rosa font-bold tracking-widest text-2xl mb-5">
          NUESTROS
        </p>
        <h1 className="text-3xl font-bold tracking-wide">
          Tours & experiencias
        </h1>
      </div>
      <div className="relative lg:pt-20 lg:px-36 sm:flex sm:flex-col md:grid md:grid-cols-2 gap-2 mx-32">
        <div className="absolute lg:right-40 lg:top-0 md:right-0 md:-top-16">
          <FavoriteButton
            clienteId={clienteId}
            productoId={id}
            className="text-red-500"
          />
        </div>
        {/* Imagen principal grande a la izquierda */}
        <div className="max-h-96">
          {detallesProducto?.imagenes?.length > 0 ? (
            <img
              src={detallesProducto.imagenes[0]?.url}
              alt={`Imagen principal`}
              className="md:max-h-72  lg:h-full lg:max-h-foto object-cover h-full w-full rounded-2xl "
            />
          ) : (
            <img src={defaultImage} alt="Imagen por defecto" />
          )}
        </div>

        {/* Cuadrícula de imágenes más pequeñas a la derecha */}
        <div className=" lg:h-full grid grid-cols-2 gap-2 rounded-full max-h-96">
          {allImages &&
            allImages.map((imagen, index) => (
              <img
                key={index}
                src={imagen.url}
                alt={`Imagen ${index + 1}`}
                className="md:h-full md:min-h-32 md:max-h-36 md:w-full lg:w-full lg:h-auto object-cover rounded-2xl max-h-48 overflow-hidden"
              />
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
            <p className="text-justify">{detallesProducto?.descripcion}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p>
                Aquí podrás visualizar todas las fechas disponibles para que
                vivas tu experiencia:
              </p>
              <p className="mb-10 ">{detallesProducto?.nombre}</p>
              <Calendar productoId={id} />
            </div>
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

        <h2 className="text-2xl font-bold mt-4 mb-2">La experiencia incluye</h2>
        <CardCaracteristica />
      </div>
      <div className="mb-10">
        <p className="text-base mb-2">Antes de reservar, consulta nuestros</p>
        <button
          className="bg-purple-600 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 text-white rounded-md px-4 py-2 transition-colors duration-300 ease-in-out"
          onClick={abrirPoliticas}
        >
          Términos y Condiciones
        </button>
        {mostrarPoliticas && (
          <div>
            <div className="modal-overlay" onClick={cerrarPoliticas}>
              <span className="close" onClick={cerrarPoliticas}>
                &times;
              </span>
              <Politicas />
              {/* <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                 </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
