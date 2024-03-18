import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalAgenda from "./ModalAgenda";
import { fetchListarAgendaProducto, fetchProduct, fetchAgendarExperiencia } from "../../services/api";
import FormatDate from "../../utils/FormatDate";

const AgendaProducto = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [error, setError] = useState(null);
  const [producto, setProducto] = useState({});

  useEffect(() => {
    fetchData();
    fetchProducto();
  }, [isModalOpen]);

  const fetchData = async () => {
    try {
      const response = await fetchListarAgendaProducto(Number(id));
      console.log("Agendas: ", response);
      setAgendas(response);
      setError(null);
    } catch (error) {
      console.error("Error al obtener la lista de agendas", error);
      setAgendas([]);
      setError("No se encontraron agendas asignadas para esta experiencia.");
    }
  };

  const fetchProducto = async () => {
    try {
      const response = await fetchProduct(Number(id));
      console.log("Agenda producto: ", response);
      setProducto(response);
    } catch (error) {
      console.error("Error al obtener la lista de productos", error);
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

  return (
    <div className="overflow-hidden">
      {producto.nombre && ( // Condición para verificar si producto.nombre está disponible
        <h2 className="text-3xl font-bold mb-6">
          Agenda de la Experiencia
          <br />
          <span className="text-rosa">{producto.nombre}</span>
        </h2>
      )}
      {error ? (
        <p className="text-red-500 font-bold">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="whitespace-nowrap table-auto">
            <thead>
              <tr>
                <th>Nombre de la Experiencia</th>
                <th>Fecha</th>
                <th>Cupos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {agendas.map((agenda) => (
                <tr key={agenda.id}>
                  <td>{agenda.producto.nombre}</td>
                  <td>{FormatDate(agenda.fechaIda)} a {FormatDate(agenda.fechaVuelta)}</td>
                  <td>{agenda.cupos}</td>
                  <td>
                    <button className="flex justify-center rounded-md bg-rosa px-3 py-1.5 text-m font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Editar
                    </button>
                    <button className="flex justify-center rounded-md bg-rosa px-3 py-1.5 text-m font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Eliminar
                    </button>
                  </td>
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
