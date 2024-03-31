import React, { useState, useEffect } from "react";

const CardCaracteristica = ({ caracteristica }) => {
  const [caracteristicaSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);

  useEffect(() => {
    const storedFeatures = JSON.parse(localStorage.getItem('selectedfeatures'));
    if (storedFeatures !== null) {
      setCaracteristicasSeleccionadas(storedFeatures);
    }
  }, []);
  return (
    <div className="flex gap-4 m-12 pb-12 justify-around">
      {caracteristicaSeleccionadas && caracteristicaSeleccionadas.map(feature => (
        <div className="rounded bg-gradient-to-r from-pink-100 to-pink-200 px-4 py-2 w-52 h-44" key={feature.id}>
          <h3 className="text-center pt-2 mx-auto text-base">{feature.nombre}</h3>
          <img className="w-12 h-12 mx-auto" src={feature.url} alt={feature.alt} />
        </div>
      ))}
    </div>
  );
};

export default CardCaracteristica;
