// import React, { useEffect, useState } from "react";
// import Searcher from "../Components/searcher/Searcher";
// import perrito from "../assets/perroCard.jpg";
// import flecha from "../assets/arrowRightflecha.png";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { fetchListarProductos } from "../services/api";

// const Details = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [detallesProductos, setDetallesProductos] = useState([]);

//   const fetchDetallesProductos = async () => {
//     try {
//       // Espera a que la promesa se resuelva
//       const data = await fetchListarProductos();

//       // Verifica que data es un array antes de establecer el estado
//       if (Array.isArray(data)) {
//         setDetallesProductos(data);
//       } else {
//         console.error("fetchListarProductos no devolvió un array:", data);
//       }
//     } catch (error) {
//       console.error("Error al obtener datos:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDetallesProductos();
//   }, []);

//   return (
//     <>
//       <Searcher />
//       <div className="flex flex-col items-center my-10">
//         <p className="text-rosa font-bold tracking-widest text-2xl mb-5">
//           NUESTROS
//         </p>
//         <h1 className="text-3xl font-bold tracking-wide">
//           Tours & experiencias
//         </h1>
//       </div>

//       <div className="flex gap-1 pl-40">
//         <div className="w-6/12 rounded-md">
//           {/* Muestra la primera imagen del arreglo */}
//           {detallesProductos.length > 0 && (
//             <img
//               className="w-full h-auto rounded-md"
//               src={detallesProductos[0]}
//               alt="Imagen 1"
//             />
//           )}
//         </div>
//         <div className="flex justify-between flex-wrap w-6/12 gap-1 rounded-md">
//           {detallesProductos.slice(1).map((imagen, index) => (
//             <img
//               key={index}
//               className="w-6/12 rounded-md"
//               src={imagen.imagenes}
//               alt={`Imagen ${index + 2}`}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center gap-40">
//         <div className="w-1/3 flex flex-col items-start my-20">
//           <p className="text-rosa font-bold tracking-widest text-2xl mb-5">
//             COLOMBIA
//           </p>
//           <h1 className="text-3xl font-bold tracking-wide">
//             Experiencia natural y sensible
//           </h1>
//         </div>
//         <div className="w-1/3 flex my-20 pr-20 justify-end">
//           <button onClick={() => navigate(-1)} className="flex pt-5">
//             <img className=" w-10 h-10" src={flecha} alt="" />
//             <p className="pt-2 text-gray-300 font-medium">Volver</p>
//           </button>
//         </div>
//       </div>
//       <p className="pl-40 pr-56">{imagen.descripcion}</p>
//     </>
//   );
// };

// export default Details;

import React, { useEffect, useState } from "react";
import Searcher from "../Components/searcher/Searcher";
import flecha from "../assets/arrowRightflecha.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchListarProductos } from "../services/api";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detallesProductos, setDetallesProductos] = useState([]);

  const fetchDetallesProductos = async () => {
    try {
      const data = await fetchListarProductos();
      if (Array.isArray(data)) {
        setDetallesProductos(data);
      } else {
        console.error("fetchListarProductos no devolvió un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchDetallesProductos();
  }, []);

  // Find the selected product based on the 'id' parameter
  const selectedProduct = detallesProductos.find(
    (product, index) => index.toString() === id
  );

  // Redirect to home if the product is not found
  if (!selectedProduct) {
    navigate("/");
    return null;
  }

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

      {/* <div className="flex gap-1 pl-40">
        <div className="w-6/12 rounded-md">
          {selectedProduct.imagenes.map((imagen, index) => (
            <img
              key={index}
              className="w-full h-auto rounded-md"
              src={imagen.url}
              alt={`Imagen ${index + 1}`}
            />
          ))}
        </div>
      </div> */}

      <div className="flex gap-4 pl-40">
        {/* Imagen principal grande a la izquierda */}
        <div className="w-6/12 rounded-md">
          {selectedProduct.imagenes.length > 0 && (
            <img
              className="w-full h-auto rounded-md"
              src={selectedProduct.imagenes[0].url}
              alt={`Imagen principal`}
            />
          )}
        </div>

        {/* Cuadrícula de imágenes más pequeñas a la derecha */}
        <div className="w-6/12 grid grid-cols-2 gap-4">
          {selectedProduct.imagenes.slice(1, 5).map((imagen, index) => (
            <img
              key={index}
              className="w-full h-auto rounded-md"
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
              {selectedProduct.nombre}
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
        <p>{selectedProduct.descripcion}</p>
        <p>{selectedProduct.fecha}</p>
        <p>{selectedProduct.cupo}</p>
        <p>{selectedProduct.disponible}</p>
      </div>
    </>
  );
};

export default Details;
