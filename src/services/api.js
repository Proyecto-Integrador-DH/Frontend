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