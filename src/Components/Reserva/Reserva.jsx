import React, { useEffect, useState } from "react";
import {
  fetchNuevaReserva,
  fetchObtenerClienteByUsuario,
  fetchProductosAleatorios,
} from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";
import { useSearchParams, useNavigate, useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { FaWheelchair } from "react-icons/fa";
import SearchForm from "../searcher/SearcherForm";
import Card from "../Card/Card";

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
  const [showClientData, setShowClientData] = useState(false);
  const [productosSugeridos, setProductosSugeridos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProductosAleatorios(4)
      .then((productos) => {
        console.log("Productos sugeridos:", productos);
        setProductosSugeridos(productos);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      });
  }, []);

  const verificarCliente = (e) => {
    const agendaSeleccionada = JSON.parse(
      decodeURIComponent(new URLSearchParams(location.search).get("agenda"))
    );
    fetchObtenerClienteByUsuario(Number(usuario.id))
      .then((clienteData) => {
        setClient(clienteData);
        console.log("Cliente", clienteData);
        setAgenda(agendaSeleccionada);
      })
      .catch((error) => {
        navigate(
          `/cliente?agenda=${encodeURIComponent(
            JSON.stringify(agendaSeleccionada)
          )}`
        );
        console.error(errorHandling(error));
      });
  };

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
      fetchNuevaReserva(formDataCopy)
        .then((data) => {
          console.log("Reserva", data);
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

  const toggleClientData = () => {
    setShowClientData(!showClientData);
  };

  const truncar = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="w-full">
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <h2 className="text-3xl font-bold my-6 text-center">Generar Reserva</h2>
      <SearchForm />
      <div className="flex justify-evenly mt-4">
        <div className="w-7/12">
          <div className="border rounded-lg p-4 relative bg-white shadow-md">
            {agenda &&
              agenda.producto &&
              agenda.producto.imagenes &&
              agenda.producto.imagenes[0] && (
                <img
                  src={agenda.producto.imagenes[0].url}
                  className="object-cover w-full h-3/6 rounded-t-lg mx-auto"
                  alt={agenda.producto.nombre}
                />
              )}
            <div className="flex bg-purple-100 rounded-b-lg w-full mx-auto  ">
              <div className="w-6/12 ">
                <h3 className="text-xl font-bold pb-2 pt-4 pl-6 text-left">
                  {agenda && agenda.producto && agenda.producto.nombre}
                </h3>
                <p className="mb-3 font-normal pl-6 text-left">
                  Cupos disponibles: {agenda && agenda.cupos}
                </p>
                <p className="mb-3 font-normal pl-6 text-left">
                  Ubicación:{" "}
                  {agenda && agenda.producto && agenda.producto.ubicacion}
                </p>
                <p className="text-sm mb-4 pl-6 text-left pb-6">
                  {truncar(
                    agenda && agenda.producto && agenda.producto.descripcion,
                    200
                  )}
                </p>
                <h3 className="pl-6 pb-3">Descubre tu experiencia:</h3>
                <div className="flex flex-row content-center pl-8 pt-2">
                  <div className="flex flex-col gap-3">
                    <FaClock color="#9333EA" size={"20px"} />
                    <FaCalendar color="#9333EA" size={"20px"} />
                    <FaLanguage color="#9333EA" size={"25px"} />
                    <FaWheelchair color="#9333EA" size={"20px"} />
                  </div>
                  <div className="flex flex-col gap-3.5 pl-4">
                    <p className="text-left">Duración: 2 días</p>
                    <p className="text-left">Disponible todo el año</p>
                    <p className="text-left">Guía bilingue</p>
                    <p className="text-left">Accesibilidad limitada </p>
                  </div>
                </div>
              </div>
              <div className="w-6/12 p-6">
                <h3 className="w-full text-xl font-bold pb-2 text-center">
                  Datos para la reserva:{" "}
                </h3>
                <div className="p-3">
                  <p className="text-left">
                    Cliente: {usuario && usuario.nombre}{" "}
                    {usuario && usuario.apellido}
                  </p>
                  <p className="text-left">
                    Correo electrónico: {usuario && usuario.email}
                  </p>
                  {showClientData && (
                    <>
                      <p className="text-left">
                        Teléfono: {cliente && cliente.telefono}
                      </p>
                      <p className="text-left">
                        Dirección:{cliente && cliente.direccion}
                      </p>
                      <p className="text-left">
                        Ciudad:{cliente && cliente.ciudad}
                      </p>
                      <p className="text-left">
                        Documento:{cliente && cliente.tipoDocumento}
                      </p>
                      <p className="text-left">
                        Número de documento:{cliente && cliente.numeroDocumento}
                      </p>
                    </>
                  )}
                </div>
                <button
                  onClick={toggleClientData}
                  className="mt-1 text-purple-600 font-bold"
                >
                  {showClientData ? "Ver menos" : "Ver más"}
                </button>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-start p-3"
                >
                  <label className="mb-4 mr-10">
                    Fecha de ida:
                    <DatePicker
                      selected={agenda ? new Date(agenda.fechaIda) : null}
                      dateFormat={"dd/MM/yyyy"}
                      readOnly
                      className="border-none rounded-lg"
                    />
                  </label>
                  <label className="mb-4 mr-10">
                    Fecha de vuelta:
                    <DatePicker
                      selected={agenda ? new Date(agenda.fechaVuelta) : null}
                      dateFormat={"dd/MM/yyyy"}
                      readOnly
                      className="border-none rounded-lg"
                    />
                  </label>
                  <label className="mb-4 mr-16 pl-4">
                    Cantidad:
                    <input
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      required
                      className="border-none rounded-lg"
                    />
                  </label>
                  <button
                    type="submit"
                    className="m-auto bg-purple-600 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded"
                  >
                    Reservar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 mt-6">
          <h3 className="w-full text-2xl font-semibold my-6 text-center">
            Experiencias que podrían interesarte
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {productosSugeridos.map((producto) => (
              <div key={producto.id}>
              <Card producto={producto} />
              <Link to={`/details/${producto.Id}`} className="mt-1 text-purple-600 font-semibold bg-purple-200 p-2 rounded ">
                Ver más
              </Link>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
