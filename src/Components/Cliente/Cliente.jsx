import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo03.png";
import { fetchCrearCliente } from "../../services/api";
import registerUserStyles from "./Cliente.module.css";
import ErrorComponent from "../error/ErrorAlert";
import CountrySelect from "../CountrySelect/CountrySelect";


const CrearClienteForm = () => {
  const [cliente, setCliente] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    pais: "",
  });

  const tipoDocumentoRegex = /^[a-zA-Z]+$/;
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);



  const handleClienteChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validar tipo de documento
    if (!cliente.tipoDocumento.trim()) {
      newErrors.tipoDocumento = (
        <span className={registerUserStyles.errorContainer}>
          El tipo de documento es obligatorio
        </span>
      );
    } else if (!tipoDocumentoRegex.test(cliente.tipoDocumento)) {
      newErrors.tipoDocumento = (
        <span className={registerUserStyles.errorContainer}>
          El tipo de documento no puede contener caracteres especiales ni espacios
        </span>
      );
    }

    // Validar número de documento
    if (!cliente.numeroDocumento.trim()) {
      newErrors.numeroDocumento = (
        <span className={registerUserStyles.errorContainer}>
          El número de documento es obligatorio
        </span>
      );
    }

    // Validar teléfono
    if (!cliente.telefono.trim()) {
      newErrors.telefono = (
        <span className={registerUserStyles.errorContainer}>
          El teléfono es obligatorio
        </span>
      );
    }

    // Validar dirección
    if (!cliente.direccion.trim()) {
      newErrors.direccion = (
        <span className={registerUserStyles.errorContainer}>
          La dirección es obligatoria
        </span>
      );
    }

    // Actualizar el estado de los errores
    setErrors(newErrors);

    // Si hay algún error, detener el envío del formulario
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const data = await fetchCrearCliente(cliente);
      console.log("Cliente creado", data);
      setTitleError("Cliente Creado");
      setError("Cliente creado con éxito");
      setModalErrorVisible(true);
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      setTitleError("Error");
      setError("Ocurrió un error al crear el cliente");
      setModalErrorVisible(true);
    }

    // Restablecer los campos del formulario
    setCliente({
      tipoDocumento: "",
      numeroDocumento: "",
      telefono: "",
      direccion: "",
    });

    // Restablecer los errores
    setErrors({});
  };

  const closeModal = () => {
    setModalErrorVisible(false);
  };

  return (
    <div>
      {modalErrorVisible && (
        <ErrorComponent title={titleError} message={error} onClose={closeModal} />
      )}

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={Logo}
            alt="Solo Aventuras"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registro de cliente
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
                  <option value="DNI"> Documento Nacional de Identidad (DNI)</option>
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

              <CountrySelect handleClienteChange={handleClienteChange} />


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
              {/* {errors.ciudad && (
                <span className="error">{errors.ciudad}</span>
              )} */}
            </div>



            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rosa px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Crear Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CrearClienteForm;
