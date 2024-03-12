import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalAgenda from "./ModalAgenda";
import { fetchListarAgenda } from "../../services/api";
import FormatDate from "../../utils/FormatDate";

const Agenda = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

  const fetchData = async () => {
    try {
      const response = await fetchListarAgenda();
      setAgendas(response);
    } catch (error) {
      console.error('Error al obtener la lista de agendas', error);
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
      <h2 className="text-3xl font-bold mb-6">Agenda de la Experiencia</h2>
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

export default Agenda;
