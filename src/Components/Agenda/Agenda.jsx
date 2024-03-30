import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalAgenda from "./ModalAgenda";
import { fetchListarAgenda } from "../../services/api";
import FormatDate from "../../utils/FormatDate";
import Loading from "../Loading/Loading";
import ErrorComponent from "../error/ErrorAlert";

const Agenda = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [isModalOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchListarAgenda();
      setAgendas(response);
    } catch (error) {
      console.error("Error al obtener la lista de agendas", error);
      setError("Error");
      setTitleError("Error al obtener la lista de agendas");
      setModalErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

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

  const closeModal = () => {
    setModalErrorVisible(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="w-[90vw] mx-auto">
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <h2 className="text-3xl font-bold mb-6">Agenda de la Experiencia</h2>
      <div>
        <table className="whitespace-nowrap table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">
                Nombre de la Experiencia
              </th>
              <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">
                Fecha
              </th>
              <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">
                Cupos
              </th>
              <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {agendas.map((agenda) => (
              <tr key={agenda.id}>
                <td className="text-md text-center">
                  {agenda.producto.nombre}
                </td>
                <td className="text-md text-center">
                  {FormatDate(agenda.fechaIda)} a{" "}
                  {FormatDate(agenda.fechaVuelta)}
                </td>
                <td className="text-md text-center">{agenda.cupos}</td>
                <td>
                  <button className="w-20 flex mx-auto m-2 rounded-md bg-fuchsia-400 px-3 py-2 text-sm font-medium text-justify text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Editar
                  </button>
                  <button className="w-20 flex mx-auto m-2 rounded-md bg-fuchsia-400 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
          className="flex justify-center rounded-md bg-fuchsia-400 px-3 py-3 text-m font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-10"
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
