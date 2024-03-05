import React, { useState, useEffect } from "react";
import { fetchListarProductos } from "../../services/api";
import style from "./ListProducts.module.css";
import { fetchCategorias } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";

const ListProducts = () => {
  const [productos, setProducts] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({});
  const [showOptions, setShowOptions] = useState({});

  useEffect(() => {
    fetchListarProductos()
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      });
  }, []);

  useEffect(() => {
    fetchCategorias()
      .then((data) => {
        setCategoria(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(errorHandling(error));
      });
  }, []);

  const handleCategoriaChange = (productoId, event) => {
    const nuevaSeleccion = { ...categoriaSeleccionada };
    nuevaSeleccion[productoId] = event.target.value;
    setCategoriaSeleccionada(nuevaSeleccion);
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Producto</th>
            <th>Categorias</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.Id}>
              <td>{producto.Id}</td>
              <td>{producto.nombre}</td>
              <td>
                <div className="relative mt-2">
                  <button
                    type="button"
                    className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded={showOptions[producto.Id]}
                    aria-labelledby="listbox-label"
                    onClick={() => setShowOptions({ ...showOptions, [producto.Id]: !showOptions[producto.Id] })}
                  >
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {categoriaSeleccionada[producto.Id]
                          ? categoriaSeleccionada[producto.Id]
                          : "Selecciona una categoría"}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <svg
                        className={`h-5 w-5 ${showOptions[producto.Id] ? "transform rotate-180" : ""
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
                    <ul
                      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-option-3"
                    >
                      {categorias.map((categoria, index) => (
                        <li
                          key={categoria.id}
                          value={categoria.nombre}
                          className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            handleCategoriaChange(producto.Id, { target: { value: categoria.nombre } });
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
                  )}
                </div>
              </td>
              <td>
                <button className={style.button}>Actualizar</button>
                <button className={style.button}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProducts;
