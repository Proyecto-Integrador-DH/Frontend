import React, { useState } from "react";
import Logo from "../assets/Logo03.png";
import { fetchLogin } from "../services/api";
import { errorHandling } from "../services/errorHandling";
import ErrorComponent from "../Components/error/ErrorAlert";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await fetchLogin({
        email,
        pass,
      });
      console.log(typeof loginResponse);
      console.log(loginResponse);
      if (loginResponse) {
        console.log("Login exitoso.");
        setError("Login exitoso.");
        setTitleError("Inicio de sesión exitoso.");
        setModalErrorVisible(true);
        setEmail("");
        setPassword("");
        localStorage.setItem("token", loginResponse);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        return;
      }
      } catch (error) {
        console.log("Correo o contraseña incorrectos.");
        setError("Por favor verifique los datos ingresados");
        setTitleError("Correo o contraseña incorrectos.");
        setModalErrorVisible(true);
        return;
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
  };

  const isAuthenticated = localStorage.getItem("token");

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
            Inicie sesión en su cuenta
          </h2>
          {!isAuthenticated
          }
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
                Correo electronico
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
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="pass"
                  name="pass"
                  type="password"
                  autoComplete="current-password"
                  value={pass}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={5}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rosa px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No tienes una cuenta?{" "}
            <Link to ="/crearUsuario" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
