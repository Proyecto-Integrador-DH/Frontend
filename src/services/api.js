const baseUrl = 'http://localhost:8081';
const baseUrl2 = 'http://localhost:8081';

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
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return response.status;
  }
  return await response.text();
};

export const fetchCargarImagen = async (data) => {
  const url = `${baseUrl}/imagen/cargar`;
  console.log("datos login " , data);

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
  const url = `${baseUrl}/usuario/nuevo`;

  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
  if(!response.ok){
      return response.status;
  }

  return await response.text();
}


export const fetchEmail = async (data) => {
  const url = `${baseUrl}/usuario/email`;
  const response = await fetch(url, {
    Authorization: localStorage.getItem('token'),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.json();
}

export const fetchLogin = async (data) => {
  const url = `${baseUrl2}/usuario/login`;

  console.log("datos login " , data);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log("login",response);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.text();
}