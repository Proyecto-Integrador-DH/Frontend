const baseUrl = 'http://localhost:8080';

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