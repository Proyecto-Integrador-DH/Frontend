import React, { useState, useEffect } from "react";
import { fetchCaracteristicas, fetchCambiarCaracteristicas } from "../../services/api";
import style from './AsignarCaracterisica.module.css'
import Loading from "../Loading/Loading";

const AsignarCaracteristica = ({ productoSeleccionadoId}) => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaracteristicas()
      .then(data => {
        setLoading(true);
        setCaracteristicas(data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
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

  const handleGuardar = async () => {
    try {
      await fetchCambiarCaracteristicas(productoSeleccionadoId, caracteristicasSeleccionadas.map(c => c.id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="size-3/4 mx-auto my-10 pb-10 mt-20">
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
      <button className={style.button} onClick={handleGuardar}>Guardar</button>
    </div>
  );
};

export default AsignarCaracteristica;