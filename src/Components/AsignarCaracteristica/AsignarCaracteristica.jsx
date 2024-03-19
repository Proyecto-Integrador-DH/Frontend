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
    <div className="size-3/4 mx-auto my-10 pb-10">
      <h2 className="my-10 text-2xl font-bold mb-6">Características Disponibles</h2>
      <ul className="inline-grid gap-4 grid-cols-3 grid-rows-3">
        {caracteristicas.map(caracteristica => (
          <li className="w-full" key={caracteristica.id}>
           <div className="flex items-center ps-3">
           <input
            className="object-left rounded border-purple-900 checked:bg-purple-900"
              type="checkbox"
              id={caracteristica.id}
              onChange={(e) => handleSeleccionChange(e, caracteristica)}
            />
            <label className="ml-4" htmlFor={caracteristica.id}>{caracteristica.nombre}</label>
           </div>
          </li>
        ))}
      </ul>
      <button className={style.button} onClick={handleGuardar}>Guardar</button> {/* Agrega el botón "Guardar" */}
    </div>
  );
};

export default AsignarCaracteristica;