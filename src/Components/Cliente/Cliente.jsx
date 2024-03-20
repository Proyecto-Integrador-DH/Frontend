import React, { useState, useEffect } from "react";
import { fetchCrearCliente } from "../../services/api";

const CrearClienteForm = ({ user }) => {
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

  const handleClienteChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cliente.usuario_id != "") {
        const data = await fetchCrearCliente(cliente);
        console.log("Cliente creado", data);
      }
      setCliente({
        usuario_id: "",
        tipoDocumento: "",
        numeroDocumento: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        pais: "",
      });
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-6" onSubmit={handleSubmit}>
      {/* Campos para los datos del cliente */}

      <h3 className="w-full text-center text-2xl font-semibold p-0">Datos cliente</h3>
      <p className="text-center text-xs font-base mb-2">Complete los siguientes campos</p>

      <div className="mb-5">
      <input
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        type="text"
        name="tipoDocumento"
        value={cliente.tipoDocumento}
        onChange={handleClienteChange}
        placeholder="Tipo de documento"
        required
      />
      </div>

      <div className="mb-5">
      <input
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        type="text"
        name="numeroDocumento"
        value={cliente.numeroDocumento}
        onChange={handleClienteChange}
        placeholder="Número de documento"
        required
      />
      </div>
      <div className="mb-5">
      <input
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        type="text"
        name="telefono"
        value={cliente.telefono}
        onChange={handleClienteChange}
        placeholder="Teléfono"
        required
      />
      </div>
      <div className="mb-5">
      <input
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        type="text"
        name="direccion"
        value={cliente.direccion}
        onChange={handleClienteChange}
        placeholder="Dirección"
        required
      />
      </div>
      <div className="mb-5">
      <input
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        type="text"
        name="ciudad"
        value={cliente.ciudad}
        onChange={handleClienteChange}
        placeholder="Ciudad"
        required
      />
      </div>
      <div className="mb-5">
      <input
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        type="text"
        name="pais"
        value={cliente.pais}
        onChange={handleClienteChange}
        placeholder="País"
        required
      />
      </div>
      <button className="my-6 px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">Completar Información</button>
    </form>
  );
};

export default CrearClienteForm;
