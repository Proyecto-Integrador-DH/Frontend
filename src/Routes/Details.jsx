import React, { useEffect, useState } from "react";
import Searcher from "../Components/searcher/Searcher";
import flecha from "../assets/arrowRightflecha.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../services/api";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detallesProducto, setDetallesProducto] = useState([]);

  const defaultImage = "https://via.placeholder.com/150";
  const totalImage = 4;

  const fetchDetallesProductos = async () => {
    try {
      const data = await fetchProduct(id);
      setDetallesProducto(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const missingImagesCount = Math.max(
    totalImage - (detallesProducto?.imagenes?.length ?? 0), // Usamos el operador de fusión nula (??) para manejar el caso de que detallesProducto?.imagenes sea nulo
    0
  );
  const missingImagesArray = new Array(missingImagesCount).fill(defaultImage);

  const allImages = detallesProducto?.imagenes
    ?.slice(1, 5)
    .concat(missingImagesArray);

  console.log("imagenes", allImages);

  useEffect(() => {
    fetchDetallesProductos();
  }, []);


  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const fecha = new Date(dateString);
    const opcionesDeFormato = { year: 'numeric', month: 'long', day: '2-digit' };
    return fecha.toLocaleDateString('es-ES', opcionesDeFormato);
  };

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

      <div className="flex justify-center gap-40">
        <div className="w-1/3 flex flex-col items-start my-20">
          <p className="text-rosa font-bold tracking-widest text-2xl mb-5">
            <h1 className="text-3xl font-bold tracking-wide">
              {detallesProducto?.nombre}
            </h1>
          </p>
        </div>
        <div className="w-1/3 flex my-20 pr-20 justify-end">
          <button onClick={() => navigate(-1)} className="flex pt-5">
            <img className=" w-10 h-10" src={flecha} alt="" />
            <p className="pt-2 text-gray-300 font-medium">Volver</p>
          </button>
        </div>
      </div>

      <div className="pl-40 pr-56">
        {/* Muestra la descripción del producto seleccionado */}
        <p>{detallesProducto?.descripcion}</p>
        {/* Mostrar la fecha formateada */}
        <p>Fecha de salida: {formatDate(detallesProducto?.fecha)}</p>
        <p>Cupos disponibles: {detallesProducto?.cupo}</p>
        <p>{detallesProducto?.disponible}</p>
      </div>
    </>
  );
};

export default Details;
