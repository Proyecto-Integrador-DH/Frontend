import React, { useEffect, useState } from 'react'
import { errorHandling } from '../../services/errorHandling';
import { fetchListarUsuarios } from '../../services/api';

const ListarUsuarios = () => {

  const [usuario, setUsuario] = useState([])

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


  return (

    <div>
      



    </div>

  )
}

export default ListarUsuarios