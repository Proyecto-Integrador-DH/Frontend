import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalAgenda from "./ModalAgenda";
import { fetchListarAgendaProducto, fetchProduct } from "../../services/api";

const AgendaProducto = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [error, setError] = useState(null);
  const [producto, setProducto] = useState({});

  useEffect(() => {
    fetchData();
    fetchProducto();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchListarAgendaProducto(Number(id));
      console.log("Agendas: ", response);
      setAgendas(response);
      setError(null); // Resetear el error si se recibe una respuesta exitosa
    } catch (error) {
      console.error("Error al obtener la lista de agendas", error);
      setAgendas([]);
      setError("No se encontraron agendas asignadas para esta experiencia.");
    }
  };

  const fetchProducto = async () => {
    try {
      const response = await fetchProduct(Number(id));
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

  const handleModalSubmit = (data) => {
    fetchData();
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">
        Agenda de la Experiencia
        <br />
        <span className="text-rosa">{producto.nombre}</span>
      </h2>
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
                  <td>{agenda.fecha}</td>
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
        />
      </div>
    </div>
  );
};

export default AgendaProducto;
