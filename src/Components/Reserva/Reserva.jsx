import React, { useEffect, useState } from "react";
import { fetchListarAgenda, fetchNuevaReserva } from "../../services/api";
import FormatDate from "../../utils/FormatDate";

const Reserva = () => {
  const [formData, setFormData] = useState({
    agenda: "",
    cantidad: "",
    estado: true,
  });
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    fetchListarAgenda()
      .then((data) => {
        console.log("Agendas", data);
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
      const formDataCopy = { ...formData, agenda: { id: parseInt(formData.agenda) } };
      fetchNuevaReserva(formDataCopy)
        .then((data) => {
          console.log("Reserva", data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Debe seleccionar una agenda");
    }
  };

  return (
    <div>
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
                {agenda.producto.nombre} - {FormatDate(agenda.fecha)}
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
