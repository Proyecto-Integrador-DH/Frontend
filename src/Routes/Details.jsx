import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchProduct,
  fetchCheckFavoritos,
} from "../services/api";
import flecha from "../assets/arrowRightflecha.png";
<<<<<<< HEAD
import Calendar from "../Components/calendar/Calendar";
import "./details.css"; // Importa el archivo CSS para estilos personalizados
import { fetchListarAgendaProducto } from "../services/api";
=======
import "./details.css";
import FavoriteButton from "../Components/Favorite/Favorite";
>>>>>>> a97622b0b520319e5c50d2afdab12bc3a8688667

const Details = ({ clienteId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detallesProducto, setDetallesProducto] = useState([]);
<<<<<<< HEAD
  //const fechaInicio = new Date("2024-03-25");
  //const fechaFin = new Date("2024-03-31");
=======
  const [isFavorite, setIsFavorite] = useState(false);

>>>>>>> a97622b0b520319e5c50d2afdab12bc3a8688667
  const defaultImage = "https://via.placeholder.com/150";
  const totalImage = 4;

  //
  const [fechaSalida, setFechaSalida] = useState(null);
  const [fechaVuelta, setFechaVuelta] = useState(null);

  useEffect(() => {
    const fetchDetallesProductos = async () => {
      try {
        const data = await fetchProduct(id);
        setDetallesProducto(data);
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      }
    };

    const fetchAgendaProducto = async () => {
      try {
        const agendaData = await fetchListarAgendaProducto(id);
        // Suponiendo que la agenda solo tiene una entrada
        const agenda = agendaData[0];
        setFechaSalida(new Date(agenda.fechaIda));
        setFechaVuelta(new Date(agenda.fechaVuelta));
      } catch (error) {
        console.error("Error al obtener detalles de la agenda del producto:", error);
      }
    };

    fetchDetallesProductos();
    fetchAgendaProducto();
  }, [id]);

  //

  const fetchPrueba = async () => {
    try {
      const data = await fetchListarAgenda(id );
    
      return data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

fetchPrueba().then(result => {
  // Accede al resultado dentro de este bloque
  console.log("Hola", id);
});

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

  useEffect(() => {
    fetchDetallesProductos();
    
  }, []);

<<<<<<< HEAD
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const fecha = new Date(dateString);
    const opcionesDeFormato = { year: 'numeric', month: 'long', day: '2-digit' };

    return fecha.toLocaleDateString('es-ES', opcionesDeFormato);
  };
  

=======
>>>>>>> a97622b0b520319e5c50d2afdab12bc3a8688667
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
      <div className="imageContainer relative">
      <div className="absolute right-40 top-0">
        <FavoriteButton clienteId={clienteId} productoId={id} className="text-red-500"/>
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
            <p className="text-justify">{detallesProducto?.descripcion}</p>
          </div>
          <div className="flex flex-col justify-between">
<<<<<<< HEAD
            <div>
              <p>Fecha de salida: {formatDate(fechaSalida)}</p>
              <p>Fecha de regreso: {formatDate(fechaVuelta)}</p>
              <p>Cupos disponibles: {detallesProducto?.cupo}</p>
              <p>{detallesProducto?.disponible}</p>
            </div>
            <div>
        
            </div>
=======
>>>>>>> a97622b0b520319e5c50d2afdab12bc3a8688667
            <div className="flex justify-end">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center"
              >
                <img src={flecha} alt="Volver" className="w-6 h-6 mr-2" />
                <span className="text-gray-400">Volver</span>
              </button>
            </div>

            <Calendar fechaInicio={fechaSalida} fechaFin={fechaVuelta} /> 
           {/* <Calendar fechaInicio={new Date(detallesProducto.fechaInicio)} fechaFin={new Date(detallesProducto.fechaFin)} />*/}
            
          </div>
          
        

          

        </div>

      </div >
    </>
  );
};

export default Details;
