import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchCambiarCategoria,
  fetchListarProductos,
  fetchDeleteProducto,
} from "../../services/api";
import style from "./ListProducts.module.css";
import { fetchCategorias } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import ErrorComponent from "../error/ErrorAlert";
import AsignarCaracteristica from "../AsignarCaracteristica/AsignarCaracteristica";
import Loading from "../Loading/Loading";

const ListProducts = () => {
  const [productos, setProducts] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});
  const [showOptions, setShowOptions] = useState({});
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [mostrarAsignarCaracteristica, setMostrarAsignarCaracteristica] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);

  useEffect(() => {
    fetchListarProductos()
      .then((data) => {
        setLoading(true);
        setProducts(data);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchCategorias()
      .then((data) => {
        setLoading(true);
        setCategoria(data);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const refrescarProductos = async () => {
    try {
      setLoading(true);
      const data = await fetchListarProductos();
      setProducts(data);
    } catch (error) {
      console.error(
        "Error al actualizar la lista de productos:",
        error.message
      );
      console.error(
        "Error al actualizar la lista de productos. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCategoria = async (idProducto, categoria) => {
    var valor = null;
    for (let clave in categoria) {
      valor = categoria[clave];
    }
    const idCategoria = categorias.find((c) => c.nombre === valor).id;
    try {
      setLoading(true);
      await fetchCambiarCategoria(idProducto, idCategoria);
      await refrescarProductos();
      setModalErrorVisible(true);
      setTitleError("Categoría Actualizada");
      setError("La categoría se ha actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error.message);
      setModalErrorVisible(true);
      setTitleError("Error");
      setError(
        "Error al actualizar la categoría. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoriaChange = (productoId, event) => {
    const nuevaSeleccion = { ...categoriasSeleccionadas };
    nuevaSeleccion[productoId] = event.target.value;

    setCategoriasSeleccionadas(nuevaSeleccion);
  };

  const handleDeleteProducto = async (id) => {
    try {
      setLoading(true);
      await fetchDeleteProducto(Number(id));
      await refrescarProductos();
      setModalErrorVisible(true);
      setTitleError("Producto Eliminado");
      setError("El producto se ha eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      setModalErrorVisible(true);
      setTitleError("Error");
      setError("Error al eliminar el producto. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
  };

  const handleMostrarAsignarCaracteristica = () => {
    setMostrarAsignarCaracteristica(!mostrarAsignarCaracteristica);
  }


  if (loading) return <Loading />;

  return (
    <div className="w-[95vw] mx-auto mb-20 mt-20">
      <h2 className="text-3xl font-bold mb-6">Lista de Experiencias</h2>
      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}
      <div className="relative shadow-md sm:rounded-lg">
        <table className="w-[95vw] mx-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-sm font-semibold tracking-wide text-left">
                ID
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wide text-left">
                Nombre de la Experiencia
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wide text-left">
                Categoría
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wide text-left">
                Cambiar categoría
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wide text-center">
                Acciones
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wide text-left">
                Agenda
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.Id}>
                <td className="text-sm text-left">{producto.Id}</td>
                <td className="text-sm text-left">{producto.nombre}</td>
                <td className="text-sm text-left capitalize">
                  {producto.categoria.nombre}
                </td>
                <td>
                  <div className="relative mt-2 text-center">
                    <button
                      type="button"
                      className="relative w-40 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      aria-haspopup="listbox"
                      aria-expanded={showOptions[producto.Id]}
                      aria-labelledby="listbox-label"
                      onClick={() =>
                        setShowOptions({
                          ...showOptions,
                          [producto.Id]: !showOptions[producto.Id],
                        })
                      }
                    >
                      <span className="flex items-center">
                        <span className="capitalize ml-3 block truncate">
                          {categoriasSeleccionadas[producto.Id]
                            ? categoriasSeleccionadas[producto.Id]
                            : "Selecciona una categoría"}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg
                          className={`h - 5 w-5 ${
                            showOptions[producto.Id]
                              ? "transform rotate-180"
                              : ""
                          } text-gray-400`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                    {showOptions[producto.Id] && (
                      <div className="z-10">
                        <ul
                          className="z-10 capitalize absolute mt-1 max-h-56 w-full bg-white py-1 text-base shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-3"
                        >
                          {categorias.map((categoria, index) => (
                            <li
                              key={index}
                              value={categoria.nombre}
                              className="text-gray-900 cursor-default select-none py-2 pl-3 pr-9"
                              id="listbox-option-0"
                              role="option"
                              onClick={() => {
                                handleCategoriaChange(producto.Id, {
                                  target: { value: categoria.nombre },
                                });
                                setShowOptions(false);
                              }}
                            >
                              <div className="flex items-center">
                                <span className="font-normal ml-3 block truncate">
                                  {categoria.nombre}
                                </span>
                              </div>
                              <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
                <td className="accion text-center">
                  <button
                    className={style.button1}
                    onClick={() =>
                      handleChangeCategoria(
                        producto.Id,
                        categoriasSeleccionadas
                      )
                    }
                  >
                    Actualizar
                  </button>
                  <button
                    className={style.button1}
                    onClick={() => handleDeleteProducto(producto.Id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className={style.button1}
                    onClick={() => {
                      setProductoSeleccionadoId(producto.Id);
                      handleMostrarAsignarCaracteristica();
                    }}
                  >
                    {mostrarAsignarCaracteristica
                      ? "Ocultar Características"
                      : "Seleccionar Características"}
                  </button>
                </td>
                <td>
                  <div>
                    <Link
                      to={`/agenda/${producto.Id}`}
                      className="text-sm text-purple-500 hover:underline"
                    >
                      Ver más
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            <div className={style.div}></div>
          </tbody>
        </table>
        {mostrarAsignarCaracteristica && (
          <AsignarCaracteristica
            productoSeleccionadoId={productoSeleccionadoId}
          />
        )}
      </div>
    </div>
  );
};

export default ListProducts;
