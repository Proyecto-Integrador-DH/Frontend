import React, { useEffect, useState } from "react";
import {
  fetchNuevaReserva, fetchObtenerClienteByUsuario
} from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Loading/Loading";
import { set } from "date-fns";

const Reserva = ({ cliente, usuario }) => {
  const [formData, setFormData] = useState({
    client: "",
    agenda: "",
    cantidad: 0,
    estado: true,
  });
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const [agenda, setAgenda] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const verificarCliente = (e) => {
    const agendaSeleccionada = JSON.parse(decodeURIComponent(new URLSearchParams(location.search).get("agenda")));
    fetchObtenerClienteByUsuario(Number(usuario.id))
    .then((clienteData) => {
      setClient(clienteData); 
      setAgenda(agendaSeleccionada);
    })
    .catch((error) => {
      navigate(`/cliente?agenda=${encodeURIComponent(JSON.stringify(agendaSeleccionada))}`);
      console.error(errorHandling(error));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    if (usuario) {
      verificarCliente();
    }
  }, [usuario, cliente]);

  useEffect(() => {
    if (agenda) {
      setFormData({
        ...formData,
        agenda: agenda.id,
      });
    }
  }, [agenda, client]);

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
        cliente: { id: client.id },
        agenda: { id: parseInt(formData.agenda) },
      };
      setLoading(true);
      fetchNuevaReserva(formDataCopy)
        .then((data) => {
          setModalErrorVisible(true);
          setTitleError("Reserva generada");
          setError("La reserva se generó correctamente");
          setShowSuccessMessage(true); 
          setTimeout(() => {
            navigate("/reservas"); 
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          setModalErrorVisible(true);
          setTitleError("Error");
          setError("No hay cupos disponibles para la agenda seleccionada");
        })
        .finally(() => {
          setLoading(false);
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

  if (loading) return <Loading />;

  return (
    <div className="max-w-xl mx-auto">
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <h2 className="text-3xl font-bold mb-6">Generar Reserva</h2>
      <div className="w-full flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full">
          <div className="border rounded-lg p-4 relative bg-white shadow-md">
            {agenda &&
              agenda.producto &&
              agenda.producto.imagenes &&
              agenda.producto.imagenes[0] && (
                <img
                  src={agenda.producto.imagenes[0].url}
                  className="object-cover h-40 w-full mb-4 rounded-lg"
                  alt={agenda.producto.nombre}
                />
              )}
            <div className="relative">
              <h3 className="text-lg font-bold mb-2">
                {agenda && agenda.producto && agenda.producto.nombre}
              </h3>
              <p className="mb-6 font-bold">
                Cupos disponibles: {agenda && agenda.cupos}
              </p>
              <p className="text-sm mb-4 text-justify">
                {agenda && agenda.producto && agenda.producto.descripcion}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Datos del cliente:{" "}
          </h3>
          <div>
            <p>
              {usuario && usuario.nombre} {" "} {usuario && usuario.apellido}
            </p>
            <p>{usuario && usuario.email}</p>
            <p>{cliente && cliente.telefono}</p>
            <p className="text-red-500">
              Ver más... Muestra una modal con más info
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-start">
            <label className="mb-4">
              Fecha de ida:
              <DatePicker
                selected={agenda ? new Date(agenda.fechaIda) : null}
                dateFormat={"dd/MM/yyyy"}
                readOnly
              />
            </label>
            <label className="mb-4">
              Fecha de vuelta:
              <DatePicker
                selected={agenda ? new Date(agenda.fechaVuelta) : null}
                dateFormat={"dd/MM/yyyy"}
                readOnly
              />
            </label>
            <label className="mb-4">
              Cantidad:
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
              />
            </label>
            <button
              type="submit"
              className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reservar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
