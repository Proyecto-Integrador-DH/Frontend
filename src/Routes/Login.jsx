import React, {useState} from "react";
import Logo from "../assets/Logo03.png";
import { fetchEmail } from "../services/api";
import { errorHandling } from "../services/errorHandling";
import ErrorComponent from "../Components/error/ErrorAlert";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [titleError, setTitleError] = useState(null);
    const [modalErrorVisible, setModalErrorVisible] = useState(false);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

    const loginResponse = await fetchEmail({
        email,
        password,
    });
      if(loginResponse==400){
        console.log("Correo o contraseña incorrectos.");
        setError("Error");
        setTitleError("Correo o contraseña incorrectos.");
        setModalErrorVisible(true);
        return;
      } else {
        console.log("Login exitoso.");
        setError("Login exitoso.");
        setTitleError("Inicio de sesión exitoso.");
        setModalErrorVisible(true);

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setModalErrorVisible(true);
      console.error("Error al iniciar sesión:", error.message);
    }
  }

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
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
          Inicie sesión en su cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6 w-full" action="#" method="POST">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Correo elctronico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
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
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
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
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
            Registrarse
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
