import React, { useState } from "react";
import Logo from "../../assets/Logo03.png";
import { fetchCrearUsuario } from "../../services/api";
import registerUserStyles from "./RegisterUser.module.css";
import ErrorComponent from "../error/ErrorAlert";
import Loading from "../Loading/Loading";
import { set } from "date-fns";

const nombreRegex = /^[a-zA-Z]+$/;
const apellidoRegex = /^[a-zA-Z]+$/;

function RegisterUser() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validar nombre
    if (!nombre.trim()) {
      {
        newErrors.nombre = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            El nombre es obligatorio
          </span>
        );
      }
    } else if (!nombreRegex.test(nombre)) {
      {
        newErrors.nombre = (
          <span className={registerUserStyles.errorContainer}>
            'El nombre no puede contener caracteres especiales ni espacios'
          </span>
        );
      }
    } else if (nombre.trim().length < 4) {
      {
        newErrors.nombre = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            El nombre debe tener al menos 4 letras{" "}
          </span>
        );
      }
    }

    // Validar apellido
    if (!apellido.trim()) {
      {
        newErrors.apellido = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            El apellido es obligatorio
          </span>
        );
      }
    } else if (!apellidoRegex.test(apellido)) {
      {
        newErrors.apellido = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            El apellido no puede contener caracteres especiales ni espacios
          </span>
        );
      }
    } else if (apellido.trim().length < 4) {
      {
        newErrors.apellido = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            El apellido debe tener al menos 4 letras
          </span>
        );
      }
    }

    // Validar email
    if (!email.trim()) {
      {
        newErrors.email = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            El email es obligatorio{" "}
          </span>
        );
      }
    }

    // Validar contraseña
    if (!pass.trim()) {
      {
        newErrors.pass = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            'La contraseña es obligatoria'
          </span>
        );
      }
    } else if (pass.trim().length < 9) {
      {
        newErrors.pass = (
          <span className={registerUserStyles.errorContainer}>
            {" "}
            'La contraseña debe tener al menos 9 caracteres'
          </span>
        );
      }
    }

    // Actualizar el estado de los errores
    setErrors(newErrors);

    // Si hay algún error, detener el envío del formulario
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      const usuarioResponse = await fetchCrearUsuario({
        nombre,
        apellido,
        email,
        pass,
      });
      if (usuarioResponse == 400) {
        setLoading(false);
        setTitleError("Error");
        setError("Ya existe un usuario registrado con el mismo correo.");
        setModalErrorVisible(true);
        return;
      } else {
        setLoading(false);
        setTitleError("Usuario Registrado");
        setError("Usuario registrado con éxito");
        setModalErrorVisible(true);
      }
    } catch (error) {
      setModalErrorVisible(true);
      setTitleError("Error");
      setError("Error al registrar el usuario");
      console.error("Error al registrar el usuario", error.message, error);
    } finally {
      setLoading(false);
    }
    setNombre("");
    setApellido("");
    setEmail("");
    setPass("");

    setErrors({});
  };

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
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
            Registro de usuario
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full"
            action="#"
            method="POST"
          >
            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.nombre && (
                <span className="error">{errors.nombre}</span>
              )}
            </div>

            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Apellido
              </label>
              <div className="mt-2">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="family-name"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.apellido && (
                <span className="error">{errors.apellido}</span>
              )}
            </div>

            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="pass"
                  name="pass"
                  type="password"
                  autoComplete="new-password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  minLength={9}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.pass && <span className="error">{errors.pass}</span>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rosa px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
