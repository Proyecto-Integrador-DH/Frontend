import React, { useState, useRef, useEffect } from "react";
import RpStyles from "./RegisterProducts.module.css";
import ErrorComponent from "../error/ErrorAlert";
import { fetchProductoNuevo } from "../../services/api";
import { fetchCargarImagen } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import Button from "../button/Button";
import { fetchCategorias } from '../../services/api';
import RegisterProductsStyles from "./RegisterProducts.module.css";


const RegisterProducts = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [cupo, setCupo] = useState(0);
  const [disponible, setDisponible] = useState(true);
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [categorias, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);


  useEffect(() => {

    fetchCategorias()
      .then(data => {
        setCategoria(data)
        console.log(data);
      })
      .catch(error => {
        console.error(errorHandling(error));
      });
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const productoResponse = await fetchProductoNuevo({
        nombre,
        descripcion,
        fecha,
        cupo,
        disponible,
        categoria: {
          id: categoriaSeleccionada.id
        }
      });

      if (productoResponse == 400) {
        console.log("Ya existe un producto con ese nombre.");
        setTitleError("Error");
        setError("Ya existe una experiencia con ese nombre.");
        setModalErrorVisible(true);
        return;
      } else {

        await fetchCargarImagen({
          imgPath: imagenes,
          altText: "Img",
          producto: {
            id: Number(productoResponse)
          }
        });

        setModalErrorVisible(true);
        setTitleError("Experiencia registrada");
        setError("La experiencia ha sido registrada con éxito.");

        setNombre("");
        setDescripcion("");
        setFecha("");
        setCupo(0);
        setDisponible(true);
        setImagenes(null);
        setCategoriaSeleccionada(null);
      }
    } catch (error) {
      setModalErrorVisible(true);
      console.error("Error al registrar el producto:", error.message);
    }
  };

  const handleImagenChange = (event) => {
    const files = Array.from(event.target.files);
    const imagenes = new Array();

    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            imagenes.push(base64String);
            resolve(imagenes);
          };
          reader.onerror = (error) => reject(error);
        });
      })
    ).then(() => {
      console.log("Imágenes convertidas a base64:", imagenes);
      setImagenes(imagenes.length === 0 ? [] : imagenes);
      console.log("Estado de imágenes actualizado:", imagenes.length);
    });
  };

  const closeModal = () => {
    setModalErrorVisible(false);
    errorHandling(error);
  };

  return (
    <div className={RpStyles.formContainer}>
      <h2 className={RpStyles.title}> Registro de Experiencias </h2>

      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}

      <form onSubmit={handleSubmit} className={RegisterProductsStyles.formulario}>

        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            value={descripcion}
            placeholder="Descripcion"
            rows={5}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>

        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>

        <label>
          Máximo de personas:
          <input
            type="number"
            value={cupo}
            onChange={(e) => setCupo(e.target.value)}
            required
          />
        </label>
        <label>
          <div>
            <label htmlFor="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Categorías</label>
            <div className="relative mt-2">
              <button
                type="button"
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                aria-haspopup="listbox"
                aria-expanded={showOptions}
                aria-labelledby="listbox-label"
                onClick={() => setShowOptions(!showOptions)}
              >
                <span className="flex items-center text-capitalize">
                  <span className="ml-3 block truncate">{categoriaSeleccionada ? categoriaSeleccionada.nombre : 'Selecciona una categoría'}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg
                    className={`h-5 w-5 ${showOptions ? 'transform rotate-180' : ''} text-gray-400`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              {showOptions && (
                <ul
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-option-3"
                >
                  {categorias.map((categoria) => (
                    <li
                      key={categoria.id}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                      id="listbox-option-0"
                      role="option"
                      onClick={() => {
                        setCategoriaSeleccionada(categoria);
                        //setShowOptions(false);
                      }}
                    >
                      <span className="block truncate nameCategory">{categoria.nombre}</span>
                    </li>
                  ))}

                </ul>
              )}
            </div>
          </div>
        </label>

        <label>
          Disponible:
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
        </label>

        <label>
          Imagenes:
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            multiple
            required
          />
        </label>
        <Button type="submit" className={RpStyles.boton}>Agregar Producto</Button>
      </form>
    </div>
  );
};

export default RegisterProducts;