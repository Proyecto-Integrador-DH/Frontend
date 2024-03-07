import React, { useEffect, useState } from 'react'
import { errorHandling } from '../../services/errorHandling';
import { fetchAsignarRol, fetchListarUsuarios, fetchQuitarRol } from '../../services/api';
import style from './ListarUsuarios.module.css';
import ErrorComponent from '../error/ErrorAlert';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  useEffect(() => {
    fetchListarUsuarios()
      .then(data => {
        setUsuarios(data);
        console.log(data);
      })
      .catch(error => {
        console.error(errorHandling(error));
      });
  }, []);

  const refrescarUsuarios = async () => {
    try {
      const data = await fetchListarUsuarios();
      setUsuarios(data);
      console.log('Lista de usuarios actualizada');
    } catch (error) {
      console.error('Error al actualizar la lista de usuarios:', error.message);
      console.error('Error al actualizar la lista de usuarios. Por favor, inténtalo de nuevo.');
    }
  };

  const handleAsignarRol = async (usuarioId, rolId) => {
    const id = Number(usuarioId);
    try {
      const response = await fetchAsignarRol({ id, roles: [{ id: rolId }] });
      console.log('Rol asignado correctamente');
      await refrescarUsuarios(); // Refrescar la lista de usuarios después de asignar el rol
    } catch (error) {
      if(error = 400){
        setModalErrorVisible(true);
        setTitleError("Error");
        setError("El usuario ya tiene el rol seleccionado");
      }
      console.error('Error al asignar el rol:', error.message);
      console.error('Error al asignar el rol. Por favor, inténtalo de nuevo.');
    }
  };

  const handleQuitarRol = async (usuarioId, rolId) => {
    const id = Number(usuarioId);
    try {
      await fetchQuitarRol({ id, roles: [{ id: rolId }] });
      console.log('Rol quitado correctamente');
      await refrescarUsuarios(); // Refrescar la lista de usuarios después de quitar el rol
    } catch (error) {
      if(error = 400){
        setModalErrorVisible(true);
        setTitleError("Error");
        setError("El usuario no es administrador");
      }
      console.error('Error al quitar el rol:', error.message);
      console.error('Error al quitar el rol. Por favor, inténtalo de nuevo.');
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>

      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Roles</th>
            <th>Permisos</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>
                {usuario.roles && usuario.roles.map(rol => (
                  <span key={rol.id}>{rol.nombre}, </span>
                ))}
              </td>
              <td>
                <button className={style.button} onClick={() => handleAsignarRol(usuario.id, 1)}>Asignar</button>
                <button className={style.button} onClick={() => handleQuitarRol(usuario.id, 2)}>Quitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;