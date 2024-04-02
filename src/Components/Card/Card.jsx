import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ producto }) => {
  const descripcionCorta = producto.descripcion.length > 100 ? producto.descripcion.substring(0, 100) + '...' : producto.descripcion;

  return (
    <div className="card mb-3 rounded-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4" style={{ height: '150px' }}>
          <img src={producto.imagenes[0].url} className="img-fluid rounded-start" alt="Foto de la experiencia" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="col-md-8">
          <div className="card-body" style={{ height: '150px' }}>
            <h5 className="card-title" style={{fontWeight: 'bold'}}>{producto.nombre}</h5>
            <p className="card-text text-sm">{descripcionCorta}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

