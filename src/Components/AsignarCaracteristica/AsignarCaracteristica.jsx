import React, { useState, useEffect } from "react";
import { fetchCaracteristicas } from "../../services/api";
import style from './AsignarCaracterisica.module.css'

const AsignarCaracteristica = ({ onSave }) => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);

  useEffect(() => {
    fetchCaracteristicas()
      .then(data => {
        setCaracteristicas(data);
      })
      .catch(error => {
        console.error(errorHandling(error));
      });
  }, []);


  const handleSeleccionChange = (e, caracteristica) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCaracteristicasSeleccionadas([...caracteristicasSeleccionadas, caracteristica]);
    } else {
      setCaracteristicasSeleccionadas(caracteristicasSeleccionadas.filter(c => c.id !== caracteristica.id));
    }
  };

  const handleGuardar = () => {
    console.log(caracteristicasSeleccionadas, "dssss");
    setCaracteristicasSeleccionadas([...caracteristicasSeleccionadas]);
    localStorage.setItem('selectedfeatures', JSON.stringify(caracteristicasSeleccionadas));
    onSave([...caracteristicasSeleccionadas]);     // Llama a la función onSave con las características seleccionadas
  };


  return (
    <div className="size-1/2 mx-auto">
      <h2 className="my-10 text-xl">Características Disponibles</h2>
      <ul>
        {caracteristicas.map(caracteristica => (
          <li key={caracteristica.id}>
            <input
              type="checkbox"
              id={caracteristica.id}
              onChange={(e) => handleSeleccionChange(e, caracteristica)}
            />
            <label htmlFor={caracteristica.id}>{caracteristica.nombre}</label>
          </li>
        ))}
      </ul>
      <button className={style.button} onClick={handleGuardar}>Guardar</button> {/* Agrega el botón "Guardar" */}
    </div>
  );
};

export default AsignarCaracteristica;