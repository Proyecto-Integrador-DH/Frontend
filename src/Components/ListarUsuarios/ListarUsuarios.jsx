import React, { useEffect, useState } from 'react'
import { errorHandling } from '../../services/errorHandling';
import { fetchAsignarRol, fetchListarUsuarios, fetchQuitarRol } from '../../services/api';
import style from './ListarUsuarios.module.css';

const ListarUsuarios = () => {

  const [usuarios, setUsuario] = useState([])

  useEffect(() => {
    fetchListarUsuarios()
      .then(data => {
        setUsuario(data);
        console.log(data);
      })
      .catch(error => {
        console.error(errorHandling(error));
      });
  }, []);


  const handleAsignarRol = async (usuarioId, rolId) => {
    try {
      // Llama a la función fetchAsignarRol con los datos del usuario y el rol
      await fetchAsignarRol({ usuarioId, rolId });
      console.log('Rol asignado correctamente');
      // Actualiza la lista de usuarios después de asignar el rol
      const updatedUsers = await fetchListarUsuarios();
      setUsuario(updatedUsers);
    } catch (error) {
      console.log('Error al asignar el rol:', error.message);
      console.log('Error al asignar el rol. Por favor, inténtalo de nuevo.');
    }
  };

  const handleQuitarRol = async (usuarioId, rolId) => {
    try {
      // Realizar la solicitud para quitar el rol al usuario
      await fetchQuitarRol({ usuarioId, rolId });
      console.log('Rol quitado correctamente');
      // Actualizar la lista de usuarios después de quitar el rol
      const updatedUsers = usuarios.map(usuario => {
        if (usuario.id === usuarioId) {
          // Si es el usuario al que se le quitó el rol, eliminar el rol de la lista
          return {
            ...usuario,
            roles: usuario.roles.filter(rol => rol.id !== rolId)
          };
        }
        return usuario;
      });
      setUsuario(updatedUsers);
    } catch (error) {
      console.error('Error al quitar el rol:', error.message);
      console.error('Error al quitar el rol. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
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
              <td>{usuario.roles.length > 0 ? usuario.roles[0].nombre : 'Sin Rol'}</td>
              <td>
                <button className={style.button} onClick={() => handleAsignarRol(usuario.id, 1)}>Asignar</button>
                <button className={style.button} onClick={() => handleQuitarRol(usuario.id, 2)}>Quitar</button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>

  )
}

export default ListarUsuarios 
