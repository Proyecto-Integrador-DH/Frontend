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
    <form onSubmit={handleSubmit}>
      {/* Campos para los datos del cliente */}
      <input
        type="text"
        name="tipoDocumento"
        value={cliente.tipoDocumento}
        onChange={handleClienteChange}
        placeholder="Tipo de documento"
        required
      />
      <input
        type="text"
        name="numeroDocumento"
        value={cliente.numeroDocumento}
        onChange={handleClienteChange}
        placeholder="Número de documento"
        required
      />
      <input
        type="text"
        name="telefono"
        value={cliente.telefono}
        onChange={handleClienteChange}
        placeholder="Teléfono"
        required
      />
      <input
        type="text"
        name="direccion"
        value={cliente.direccion}
        onChange={handleClienteChange}
        placeholder="Dirección"
        required
      />
      <input
        type="text"
        name="ciudad"
        value={cliente.ciudad}
        onChange={handleClienteChange}
        placeholder="Ciudad"
        required
      />
      <input
        type="text"
        name="pais"
        value={cliente.pais}
        onChange={handleClienteChange}
        placeholder="País"
        required
      />
      <button type="submit">Completar Información</button>
    </form>
  );
};

export default CrearClienteForm;
