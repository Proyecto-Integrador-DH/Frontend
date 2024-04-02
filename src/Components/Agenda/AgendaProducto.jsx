import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalAgenda from "./ModalAgenda";
import { fetchListarAgendaProducto, fetchProduct, fetchAgendarExperiencia } from "../../services/api";
import FormatDate from "../../utils/FormatDate";
import Loading from "../Loading/Loading";

const AgendaProducto = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [error, setError] = useState(null);
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchProducto();
  }, [isModalOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchListarAgendaProducto(Number(id));
      setAgendas(response);
      setError(null);
    } catch (error) {
      console.error("Error al obtener la lista de agendas", error);
      setAgendas([]);
      setError("No se encontraron agendas asignadas para esta experiencia.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducto = async () => {
    try {
      setLoading(true);
      const response = await fetchProduct(Number(id));
      setProducto(response);
    } catch (error) {
      console.error("Error al obtener la lista de productos", error);
    } finally {
      setLoading(false);
    }
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (data) => {
    try {
      const dataWithProduct = { ...data, producto: producto };
      await fetchAgendarExperiencia(dataWithProduct);
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al agregar la agenda", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-[90vw] mx-auto">
      {producto.nombre && (
        <h2 className="text-3xl font-bold mb-6">
          Agenda de la Experiencia
          <br />
          <span className="text-rosa">{producto.nombre}</span>
        </h2>
      )}
      {error ? (
        <p className="text-red-500 font-bold">{error}</p>
      ) : (
        <div>
          <table className="whitespace-nowrap table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Nombre de la Experiencia</th>
                <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Fecha</th>
                <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Cupos</th>
                <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {agendas.map((agenda) => (
                <tr key={agenda.id}>
                  <td className="text-md text-center">{agenda.producto.nombre}</td>
                  <td className="text-md text-center">{FormatDate(agenda.fechaIda)} a {FormatDate(agenda.fechaVuelta)}</td>
                  <td className="text-md text-center">{agenda.cupos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center m-10">
        <button
          className="flex justify-center rounded-md bg-rosa px-3 py-1.5 text-m font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-10"
          onClick={handleModalOpen}
        >
          Agendar Experiencia
        </button>
        <ModalAgenda
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          producto={producto}
        />
      </div>
    </div>
  );
};

export default AgendaProducto;
