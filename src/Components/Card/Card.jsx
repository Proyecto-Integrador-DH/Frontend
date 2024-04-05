import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ producto }) => {
  const descripcionCorta = producto.descripcion.length > 100 ? producto.descripcion.substring(0, 100) + '...' : producto.descripcion;

  return (
    <div className="card mb-3 rounded-3 ">
      <div className="row g-0">
        <div className="col-md-4 md:h-44 lg:max-h-40">
          <img src={producto.imagenes[0].url} className="img-fluid rounded-start" alt="Foto de la experiencia" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="">
            <h5 className="text-lg font-bold mb-2 mt-10">{producto.nombre}</h5>
            <p className="text-sm md:text-base">{descripcionCorta}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

