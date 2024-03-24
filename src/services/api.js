const baseUrl = "http://localhost:8081";
const baseUrl2 = "http://localhost:8080";
const token = localStorage.getItem("token");

export const fetchCategorias = async () => {
  const url = `${baseUrl}/categoria/all`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchCategoria = async (id) => {
  const url = `${baseUrl}/categoria/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchCategoryProducts = async (id) => {
  console.log("ID", id);
  const url = `${baseUrl}/categoria/categoryProducts/${id}`;
  console.log("URL", url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        "Hubo un problema al obtener los productos de la categoría."
      );
    }
    const data = await response.json();
    console.log("Productos de la categoría seleccionada", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProductoNuevo = async (data) => {
  const url = `${baseUrl}/producto/nuevo`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return response.status;
  }
  return await response.text();
};

export const fetchDeleteProducto = async (id) => {
  const url = `${baseUrl}/producto/deleteProducto/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchCargarImagen = async (data) => {
  const url = `${baseUrl}/imagen/cargar`;
  console.log("datos login ", data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.text();
};

export const fetchListarProductos = async () => {
  const url = `${baseUrl}/producto/productosAll`;
  const response = await fetch(url);
  console.log("Productos: ", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchListarProductosRecom = async () => {
  const url = `${baseUrl}/producto/productos`;
  const response = await fetch(url);
  console.log("Productos: ", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchProduct = async (id) => {
  const url = `${baseUrl}/producto/${id}`;
  const response = await fetch(url);
  console.log("Productos: ", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

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
};

export const fetchEmail = async (email) => {
  const url = `${baseUrl2}/usuario/email/${email}`;
  console.log("email", email);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchLogin = async (data) => {
  const url = `${baseUrl2}/usuario/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("login", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.text();
};

export const fetchListarUsuarios = async () => {
  const url = `${baseUrl2}/usuario/usuarios`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  console.log("Usuario BD", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }

  return await response.json();
};

export const fetchCambiarCategoria = async (idProducto, idCategoria) => {
  const url = `${baseUrl}/producto/addCategoria/${idProducto}/${idCategoria}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }

  return await response.text();
};

export const fetchAsignarRol = async (data) => {
  const url = `${baseUrl2}/usuario/asignarRol`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  console.log("Error rol", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.text();
};

export const fetchQuitarRol = async (data) => {
  const url = `${baseUrl2}/usuario/quitarRol`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.text();
};

export const fetchAgendarExperiencia = async (data) => {
  const url = `${baseUrl}/agenda/nueva`;
  console.log("Data agenda", data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchListarAgenda = async () => {
  const url = `${baseUrl}/agenda/all`;
  const response = await fetch(url);
  console.log("Agendas: ", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchListarAgendaProducto = async (id) => {
  const url = `${baseUrl}/agenda/producto/${id}`;
  const response = await fetch(url);
  console.log("Agendas: ", response);
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchNuevaReserva = async (data) => {
  const url = `${baseUrl}/reserva/nueva`;
  console.log("Data reserva", data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchSearch = async (fechaIda, fechaVuelta) => {
  const url = `${baseUrl}/agenda/fechas?fechaIda=${fechaIda}&fechaVuelta=${fechaVuelta}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchCrearCliente = async (cliente) => {
  console.log("Cliente", cliente);
  const url = `${baseUrl}/cliente/nuevo`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
};

export const fetchObtenerClienteByUsuario = async (id) => {
  const url = `${baseUrl}/cliente/buscar/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
}

export const fetchAddFavoritos = async (favorito) => {
  const url = `${baseUrl}/favoritos/save`;
  console.log("Favorito", favorito);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(favorito),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
}

export const fetchRemoveFavoritos = async (favorito) => {
  const url = `${baseUrl}/favoritos/delete`;
  console.log("Favorito", favorito);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(favorito),
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.text();
}

export const fetchCheckFavoritos = async (clienteId, id) => {
  const url = `${baseUrl}/favoritos/cliente/${clienteId}/favorito/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
}

export const fetchReservasCliente = async (id) => {
  const url = `${baseUrl}/reserva/cliente/${id.clienteId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
}

export const fetchListarFavoritosCliente = async (id) => {
  const url = `${baseUrl}/favoritos/cliente/${id}`;
  console.log("ID cliente", id);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    throw new Error("Error en la solicitud: " + response.status);
  }
  return await response.json();
}

export const fetchCaracteristicas = async () => {
  const url = `${baseUrl}/icono`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error en la solicitud: ' + response.status);
  }
  return await response.json();
}

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export const fetchCaracteristicaNueva = async (data) => {
  const url = `${baseUrl}/icono/subir`;
  console.log("datos caracteristicas ", data);
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify(data),
});if (!response.ok) {
  throw new Error("Error en la solicitud: " + response.status);
}
return await response.text();
 }

export const fetchEditarCaracteristica = async (data) => {
  const url = `${baseUrl}/icono`;
  const raw = JSON.stringify(data);
  console.log("datos caracteristicas ", data);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  fetch(url, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

export const fetchBorrarCaracteristica = async (id) => {
  const url = `${baseUrl}/icono/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(!response.ok){
    throw new Error('Error en la solicitud: ' + response.status);
  }
}