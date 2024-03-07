import React, {useState, useEffect} from "react";
import { fetchCaracteristicas } from "../../services/api";
import { fetchCaracteristicaNueva } from "../../services/api";
import { fetchEditarCaracteristica } from "../../services/api";
import { fetchBorrarCaracteristica } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import style from './Caracterisicas.module.css'


const Caracteristicas = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [caracteristicaNueva, setCaracteristicaNueva] = useState({
    nombre: "",
    url: "",
    alt: ""
  });
  const [caracteristicaEditando, setCaracteristicaEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    fetchCaracteristicas()
      .then(data => {
        setCaracteristicas(data);
      })
      .catch(error => {
        console.error(errorHandling(error));
      });
  }, []);

  const handleCrearCaracteristica = async () => {
    try {
      await fetchCaracteristicaNueva(caracteristicaNueva);
      setCaracteristicas(nuevasCaracteristicas);
      setMostrarForm(false);
    } catch (error) {
      console.error(errorHandling(error));
    }
  };

  const handleActualizarCaracteristica = async (id, data) => {
    try {
      await fetchEditarCaracteristica(data);
      const nuevasCaracteristicas = await fetchCaracteristicas();
      setCaracteristicas(nuevasCaracteristicas);
      setCaracteristicaEditando(null);
    } catch (error) {
      console.error(errorHandling(error));
    }
  };

  const handleEliminarCaracteristica = async (id) => {
    try {
      await fetchBorrarCaracteristica(id);
      const nuevasCaracteristicas = caracteristicas.filter(caracteristica => caracteristica.id !== id);
      setCaracteristicas(nuevasCaracteristicas);
    } catch (error) {
      console.error(errorHandling(error));
    }
  };

  return (
    <div>
    <h2>Caracteristicas</h2>
    <button className={style.button} onClick={() => setMostrarForm(!mostrarForm)}>Agregar Nueva Característica</button>
    {mostrarForm && (
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={caracteristicaNueva.nombre}
          onChange={(e) => setCaracteristicaNueva({ ...caracteristicaNueva, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la Imagen"
          value={caracteristicaNueva.iconPath}
          onChange={(e) => setCaracteristicaNueva({ ...caracteristicaNueva, iconPath: e.target.value })}
        />
        <input
          type="text"
          placeholder="Texto alternativo de la Imagen"
          value={caracteristicaNueva.alt}
          onChange={(e) => setCaracteristicaNueva({ ...caracteristicaNueva, alt: e.target.value })}
        />
        <button className={style.button} onClick={handleCrearCaracteristica}>Agregar</button>
      </div>
    )}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Icono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {caracteristicas.map((caracteristica, index) => (
          <tr key={index}>
            <td>{caracteristica.id}</td>
            <td>{caracteristica.nombre}</td>
            <td><img className="w-10 h-12" src={caracteristica.url} alt={caracteristica.alt} /></td>
            <td>
              <button className={style.button} onClick={() => setCaracteristicaEditando(caracteristica)}>Editar</button>
              <button className={style.button} onClick={() => handleEliminarCaracteristica(caracteristica.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {caracteristicaEditando && (
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={caracteristicaEditando.nombre}
          onChange={(e) => setCaracteristicaEditando({ ...caracteristicaEditando, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la Imagen"
          value={caracteristicaEditando.iconPath}
          onChange={(e) => setCaracteristicaEditando({ ...caracteristicaEditando, iconPath: e.target.value })}
        />
        <input
          type="text"
          placeholder="Texto alternativo de la Imagen"
          value={caracteristicaEditando.alt}
          onChange={(e) => setCaracteristicaEditando({ ...caracteristicaEditando, alt: e.target.value })}
        />
        <button className={style.button} onClick={() => handleActualizarCaracteristica(caracteristicaEditando.id, caracteristicaEditando)}>Guardar Cambios</button>
        <button className={style.button} onClick={() => setCaracteristicaEditando(null)}>Cancelar</button>
      </div>
    )}
  </div>
  );
};

export default Caracteristicas;
