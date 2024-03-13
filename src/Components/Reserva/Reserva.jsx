import React, { useEffect, useState } from "react";
import { fetchListarAgenda, fetchNuevaReserva } from "../../services/api";
import FormatDate from "../../utils/FormatDate";
import ErrorComponent from "../error/ErrorAlert";

const Reserva = ({ cliente }) => {
  const [formData, setFormData] = useState({
    cliente: "",
    agenda: "",
    cantidad: "",
    estado: true,
  });
  const [agendas, setAgendas] = useState([]);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  useEffect(() => {
    fetchListarAgenda()
      .then((data) => {
        setAgendas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agenda) {
      const formDataCopy = {
        ...formData,
        cliente: { id: cliente.id }, 
        agenda: { id: parseInt(formData.agenda) },
      };
      fetchNuevaReserva(formDataCopy)
        .then((data) => {
          console.log("Reserva", data);
          setModalErrorVisible(true);
          setTitleError("Reserva generada");
          setError("La reserva se generó correctamente");
        })
        .catch((error) => {
          console.error(error);
          setModalErrorVisible(true);
          setTitleError("Error");
          setError("No hay cupos disponibles para la agenda seleccionada");
        });
    } else {
      console.error("Debe seleccionar una agenda");
      setModalErrorVisible(true);
      setTitleError("Error");
      setError("Debe seleccionar una agenda");
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
  };

  return (
    <div>
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <h2>Generar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Agenda:
          <select
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una agenda</option>
            {agendas.map((agenda) => (
              <option key={agenda.id} value={agenda.id}>
                {agenda.producto.nombre} : {FormatDate(agenda.fechaIda)} a{" "}
                {FormatDate(agenda.fechaVuelta)}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Generar Reserva</button>
      </form>
    </div>
  );
};

export default Reserva;
