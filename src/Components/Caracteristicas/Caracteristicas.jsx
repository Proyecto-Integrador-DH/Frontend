import React, {useState, useEffect} from "react";
import { 
  fetchCaracteristicas, 
  fetchCaracteristicaNueva, 
  fetchEditarCaracteristica, 
  fetchBorrarCaracteristica 
} from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import style from './Caracterisicas.module.css'
import ErrorComponent from "../error/ErrorAlert";
import Loading from "../Loading/Loading";


const Caracteristicas = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [caracteristicaNueva, setCaracteristicaNueva] = useState({
    nombre: "",
    iconPath: "",
    alt: ""
  });
  const [caracteristicaEditando, setCaracteristicaEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaracteristicas()
      .then(data => {
        setLoading(true);
        setCaracteristicas(data);
      })
      .catch(error => {
        console.error(errorHandling(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const recargarCaracteristicas = async () => {
    try {
      setLoading(true);
      const data = await fetchCaracteristicas();
      setCaracteristicas(data);
    } catch (error) {
      console.error(
        "Error al actualizar la lista de caracteristicas:",
        error.message
      );
      console.error(
        "Error al actualizar la lista de caracteristicas. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCrearCaracteristica = async () => {
    try {
      setLoading(true);
      await fetchCaracteristicaNueva(caracteristicaNueva);
      setCaracteristicaNueva({
        nombre: "",
        iconPath: "",
        alt: ""
      });
      setMostrarForm(false);
      const nuevasCaracteristicas = await fetchCaracteristicas();
      setCaracteristicas(nuevasCaracteristicas);
      setModalErrorVisible(true);
      setTitleError("Caracteristicas actualizadas");
      setError("La lista se ha actualizado");
      await recargarCaracteristicas();
    } catch (error) {
      setModalErrorVisible(true);
      setTitleError("Error");
      setError("No se ha podido actualizar la lista. Por favor, intentalo de nuevo");
    } finally {
      setLoading(false);
    }
  };

  const handleActualizarCaracteristica = async (id, data) => {
    try {
      setLoading(true);
      await fetchEditarCaracteristica(data);
      const nuevasCaracteristicas = await fetchCaracteristicas();
      setCaracteristicas(nuevasCaracteristicas);
      setCaracteristicaEditando(null);      setModalErrorVisible(true);
      setTitleError("Caracteristica actualizada");
      setError("La caracteristica se ha actualizado");
      await recargarCaracteristicas();
    } catch (error) {
      setModalErrorVisible(true);
      setTitleError("Error");
      setError("No se ha podido actualizar la característica. Por favor, intentalo de nuevo");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarCaracteristica = async (id) => {
    try {
      setLoading(true);
      await fetchBorrarCaracteristica(id);      
      await recargarCaracteristicas();
      setModalErrorVisible(true);
      setTitleError("Caracteristica eliminada");
      setError("La caracteristica se ha eliminado");
    } catch (error) {
      setModalErrorVisible(true);
      setTitleError("Error");
      setError("No se ha podido eliminar la caracteristica. Por favor, intentalo de nuevo");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
  };

  if (loading) return <Loading />;

  return (
    <div className="size-full">
    <h2 className="text-3xl font-bold mb-6">Caracteristicas</h2>
    {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
    <button className={style.button} onClick={() => setMostrarForm(!mostrarForm)}>Agregar Nueva Característica</button>
    {mostrarForm && (
      <div className="mt-8">
        <input
          className="border-purple-600 rounded-xl mr-20"
          type="text"
          placeholder="Nombre"
          value={caracteristicaNueva.nombre}
          onChange={(e) => setCaracteristicaNueva({ ...caracteristicaNueva, nombre: e.target.value })}
        />
        <input
          className="border-purple-600 rounded-xl mr-20"
          type="text"
          placeholder="URL de la Imagen"
          value={caracteristicaNueva.iconPath}
          onChange={(e) => setCaracteristicaNueva({ ...caracteristicaNueva, iconPath: e.target.value })}
        />
        <input
          className="border-purple-600 rounded-xl mr-20"
          type="text"
          placeholder="Texto alt de la Imagen"
          value={caracteristicaNueva.alt}
          onChange={(e) => setCaracteristicaNueva({ ...caracteristicaNueva, alt: e.target.value })}
        />
        <button className={style.button} onClick={handleCrearCaracteristica}>Agregar</button>
      </div>
    )}
    <table className="w-[95vw] mx-auto">
      <thead>
        <tr>
          <th className="px-6 py-3 text-sm font-semibold tracking-wide text-center">ID</th>
          <th className="px-6 py-3 text-sm font-semibold tracking-wide text-center">Nombre</th>
          <th className="px-6 py-3 text-sm font-semibold tracking-wide text-center">Icono</th>
          <th className="px-6 py-3 text-sm font-semibold tracking-wide text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {caracteristicas.map((caracteristica, index) => (
          <tr key={index}>
            <td className="text-sm text-center">{caracteristica.id}</td>
            <td className="text-sm text-center">{caracteristica.nombre}</td>
            <td className="flex justify-center items-center"><img className="w-10 h-12" src={caracteristica.url} alt={caracteristica.alt} /></td>
            <td className="text-sm text-center">
              <button className={style.button} onClick={() => setCaracteristicaEditando(caracteristica)}>Editar</button>
              <button className={style.button} onClick={() => handleEliminarCaracteristica(caracteristica.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {caracteristicaEditando && (
      <div className="my-10">
        <input
          className="border-purple-600 rounded-xl mr-14"
          type="text"
          placeholder="Nombre"
          value={caracteristicaEditando.nombre}
          onChange={(e) => setCaracteristicaEditando({ ...caracteristicaEditando, nombre: e.target.value })}
        />
        <input
          className="border-purple-600 rounded-xl mr-20"
          type="text"
          placeholder="URL de la Imagen"
          value={caracteristicaEditando.iconPath}
          onChange={(e) => setCaracteristicaEditando({ ...caracteristicaEditando, iconPath: e.target.value })}
        />
        <input
          className="border-purple-600 rounded-xl mr-20"
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
