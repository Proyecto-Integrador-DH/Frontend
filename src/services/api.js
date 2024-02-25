const baseUrl = 'http://localhost:8080';

export const fetchCategorias = () => {
  const url = `${baseUrl}/categoria/all`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      return response.json();
    });
};

export const fetchProductoNuevo = (data) => {
  const url = `${baseUrl}/producto/nuevo`;

  return fetch(url, {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      return response.json();
    });
};