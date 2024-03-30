import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCrearCliente } from "../../services/api";
import ErrorComponent from "../error/ErrorAlert";
import Logo from "../../assets/Logo03.png";
import CountrySelect from "../CountrySelect/CountrySelect";
import Loading from "../Loading/Loading";

const CrearClienteForm = ({ user, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [cliente, setCliente] = useState({
    usuario_id: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    pais: "",
  });

  useEffect(() => {
    if (user) {
      setCliente((prevCliente) => ({ ...prevCliente, usuario_id: user.id }));
    }
  }, [user]);

  if (!location) return null;

  const handleClienteChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedCountry) => {
    setCliente((prevCliente) => ({ ...prevCliente, pais: selectedCountry })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCrearCliente(cliente)
      .then((data) => {
        setLoading(true);
        setTitleError("Cliente actualizado");
        setError("El cliente ha sido actualizado correctamente");
        setModalErrorVisible(true);
        const agendaSeleccionada = JSON.parse(
          decodeURIComponent(new URLSearchParams(location.search).get("agenda"))
        );
        onSubmit(cliente);
        setTimeout(() => {
          navigate(
            `/reserva?agenda=${encodeURIComponent(
              JSON.stringify(agendaSeleccionada)
            )}`
          );
        }, 3000);
      })
      .catch((error) => {
        console.log("Error", error);
        setTitleError("Error");
        setError("Error al crear el cliente, intente nuevamente");
        setModalErrorVisible(true);
        setErrors({});
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setModalErrorVisible(false);
  };

  if (loading) return <Loading />;

  return (
    <div>
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={Logo}
            alt="Solo Aventuras"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Actualizar Datos
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Tipo de documento
              </label>
              <div className="mt-2">
                <select
                  name="tipoDocumento"
                  value={cliente.tipoDocumento}
                  onChange={handleClienteChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona un tipo de documento</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="DNI">
                    {" "}
                    Documento Nacional de Identidad (DNI)
                  </option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                </select>
              </div>
              {errors.tipoDocumento && (
                <span className="error">{errors.tipoDocumento}</span>
              )}
            </div>
            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Número de documento
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="numeroDocumento"
                  value={cliente.numeroDocumento}
                  onChange={handleClienteChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.numeroDocumento && (
                <span className="error">{errors.numeroDocumento}</span>
              )}
            </div>
            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="telefono"
                  value={cliente.telefono}
                  onChange={handleClienteChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.telefono && (
                <span className="error">{errors.telefono}</span>
              )}
            </div>

            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Dirección
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="direccion"
                  value={cliente.direccion}
                  onChange={handleClienteChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.direccion && (
                <span className="error">{errors.direccion}</span>
              )}
            </div>
            <div>
              <CountrySelect handleCountryChange={handleCountryChange} />
            </div>
            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Ciudad
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="ciudad"
                  value={cliente.ciudad}
                  onChange={handleClienteChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.ciudad && <span className="error">{errors.ciudad}</span>}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rosa px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Actualizar Información
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearClienteForm;
