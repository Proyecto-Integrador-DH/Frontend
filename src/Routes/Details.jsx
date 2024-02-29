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

  const fetchDetallesProductos = async () => {
    try {
      console.log('hola')
      const data = await fetchProduct(id);
      setDetallesProducto(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
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
        {/* Imagen principal grande a la izquierda */}
        <div className="imagenIzquierda">
          {detallesProducto?.imagenes?.length > 0 && (
            <img
              src={detallesProducto.imagenes[0]?.url}
              alt={`Imagen principal`}
            />
          )}
        </div>

        {/* Cuadrícula de imágenes más pequeñas a la derecha */}
        <div className="cuadriculaImagenes">
          {detallesProducto?.imagenes?.slice(1, 5).map((imagen, index) => (
            <img
              key={index}
              src={imagen.url}
              alt={`Imagen ${index + 1}`}
            />
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
        <p>{detallesProducto?.fecha}</p>
        <p>{detallesProducto?.cupo}</p>
        <p>{detallesProducto?.disponible}</p>
      </div>
    </>
  );
};

export default Details;
