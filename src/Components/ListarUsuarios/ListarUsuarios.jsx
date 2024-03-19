import React, { useEffect, useState } from "react";
import { errorHandling } from "../../services/errorHandling";
import {
  fetchAsignarRol,
  fetchListarUsuarios,
  fetchQuitarRol,
} from "../../services/api";
import style from "./ListarUsuarios.module.css";
import ErrorComponent from "../error/ErrorAlert";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  useEffect(() => {
    fetchListarUsuarios()
      .then((data) => {
        setUsuarios(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      });
  }, []);

  const refrescarUsuarios = async () => {
    try {
      const data = await fetchListarUsuarios();
      setUsuarios(data);
      console.log("Lista de usuarios actualizada");
    } catch (error) {
      console.error("Error al actualizar la lista de usuarios:", error.message);
      console.error(
        "Error al actualizar la lista de usuarios. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleAsignarRol = async (usuarioId, rolId) => {
    const id = Number(usuarioId);
    try {
      await fetchAsignarRol({ id, roles: [{ id: rolId }] });
      setModalErrorVisible(true);
      setTitleError("Rol actualizado");
      setError("El rol se asignó correctamente");
      await refrescarUsuarios(); // Refrescar la lista de usuarios después de asignar el rol
    } catch (error) {
      if ((error = 400)) {
        setModalErrorVisible(true);
        setTitleError("Error");
        setError("El usuario ya tiene el rol seleccionado");
      }
      console.error("Error al asignar el rol:", error.message);
      console.error("Error al asignar el rol. Por favor, inténtalo de nuevo.");
    }
  };

  const handleQuitarRol = async (usuarioId, rolId) => {
    const id = Number(usuarioId);
    try {
      await fetchQuitarRol({ id, roles: [{ id: rolId }] });
      setModalErrorVisible(true);
      setTitleError("Rol actualizado");
      setError("El rol se quitó correctamente");
      await refrescarUsuarios(); // Refrescar la lista de usuarios después de quitar el rol
    } catch (error) {
      if ((error = 400)) {
        setModalErrorVisible(true);
        setTitleError("Error");
        setError("El usuario no es administrador");
      }
      console.error("Error al quitar el rol:", error.message);
      console.error("Error al quitar el rol. Por favor, inténtalo de nuevo.");
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
  };

  return (
    <div className="w-[95vw] mx-auto">
      <h2 className="text-3xl font-bold mb-6">Lista de Usuarios</h2>

      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}

      <table className="w-[95vw] mx-auto">
        <thead>
          <tr>
            <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">ID</th>
            <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Nombre</th>
            <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Apellido</th>
            <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Correo</th>
            <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Roles</th>
            <th className="px-6 py-3text-sm font-semibold tracking-wide text-center">Permisos</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="text-md text-center">{usuario.id}</td>
              <td className="text-md text-center">{usuario.nombre}</td>
              <td className="text-md text-center">{usuario.apellido}</td>
              <td className="text-md text-center">{usuario.email}</td>
              <td className="text-center">
                {usuario.roles &&
                  usuario.roles.map((rol) => (
                    <span key={rol.id}>
                      {rol.nombre}
                      <br />
                    </span>
                  ))}
              </td>
              <td className="text-center">
                <button
                  className={style.button}
                  onClick={() => handleAsignarRol(usuario.id, 1)}
                >
                  Asignar
                </button>
                <button
                  className={style.button}
                  onClick={() => handleQuitarRol(usuario.id, 2)}
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
