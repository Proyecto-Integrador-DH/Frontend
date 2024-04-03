import React, { useState, useEffect } from "react";
import { fetchCaracteristicas } from "../../services/api";

const CardCaracteristica = ({ producto }) => {
  const [caracteristicaSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);

  useEffect(() => {
    fetchCaracteristicas().then((data) => {
      setCaracteristicas(producto.caracteristicas);
      const seleccionadas = data.filter(caracteristica => producto.caracteristicas.includes(caracteristica.id));
      setCaracteristicasSeleccionadas(seleccionadas);
    });
   
  }, [producto]);


  useEffect(() => {
    
  }, []);
  return (
    <div className="gap-4 m-12 pb-12 justify-around sm:grid sm:grid-cols-4 m-auto">
      {caracteristicaSeleccionadas && caracteristicaSeleccionadas.map(feature => (
        <div className="m-2 rounded bg-gradient-to-r from-pink-100 to-pink-200 px-4 py-2 w-52 h-44" key={feature.id}>
          <h3 className="text-center pt-2 mx-auto text-base">{feature.nombre}</h3>
          <img className="w-12 h-12 mx-auto" src={feature.url} alt={feature.alt} />
        </div>
      ))}
    </div>
  );
};

export default CardCaracteristica;
