const baseUrl = 'http://localhost:8081';
const baseUrl2 = 'http://localhost:8080';
const token = localStorage.getItem('token');

export const fetchCategorias = async () => {
  const url = `${baseUrl}/categoria/all`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.json();
};

export const fetchProductoNuevo = async (data) => {
  const url = `${baseUrl}/producto/nuevo`;

  const response = await fetch(url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return response.status;
  }
  return await response.text();
};

export const fetchDeleteProducto = async (id) => {
  const url = `${baseUrl}/producto/deleteProducto/${id}`
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
    const data = await response.json();
    console.log(data); 
  } catch (error) {
    console.error('Error:', error); 
  }
}

export const fetchCargarImagen = async (data) => {
  const url = `${baseUrl}/imagen/cargar`;
  console.log("datos login ", data);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.text();
}

export const fetchListarProductos = async () => {
  const url = `${baseUrl}/producto/productosAll`;
  const response = await fetch(url);
  console.log("Productos: ", response);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.json();
}

export const fetchListarProductosRecom = async () => {
  const url = `${baseUrl}/producto/productos`;
  const response = await fetch(url);
  console.log("Productos: ", response);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.json();
}

export const fetchProduct = async (id) => {
  const url = `${baseUrl}/producto/${id}`;
  const response = await fetch(url);
  console.log("Productos: ", response);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.json();
}

export const fetchCrearUsuario = async (data) => {
  const url = `${baseUrl2}/usuario/nuevo`;

  console.log("Data user", data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return response.status;
  }

  return await response.text();
}


export const fetchEmail = async (email) => {
  const url = `${baseUrl2}/usuario/email/${email}`;
  console.log("email", email);
  const response = await fetch(url, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.json();
}

export const fetchLogin = async (data) => {
  const url = `${baseUrl2}/usuario/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log("login", response);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.text();
}

export const fetchListarUsuarios = async () => {
  const url = `${baseUrl2}/usuario/usuarios`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  console.log("Usuario BD", response)
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }

  return await response.json();
}

export const fetchCambiarCategoria = async (idProducto, idCategoria) => {
  const url = `${baseUrl}/producto/addCategoria/${idProducto}/${idCategoria}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });

  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }

  return await response.text(); 
}

export const fetchAsignarRol = async (data) => {
  const url = `${baseUrl2}/usuario/asignarRol`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(data),
  });
  console.log("Error rol", response);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.text();
}


export const fetchQuitarRol = async (data) => {
  const url = `${baseUrl2}/usuario/quitarRol`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.text();
}
