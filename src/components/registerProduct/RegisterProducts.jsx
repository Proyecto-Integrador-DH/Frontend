import React, { useState, useRef } from "react";
import RpStyles from "./RegisterProducts.module.css";
import ErrorComponent from "../error/ErrorAlert";
import { fetchProductoNuevo } from "../../services/api";
import { fetchCargarImagen } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import Button from "../button/Button";

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const productoResponse = await fetchProductoNuevo({
        nombre,
        descripcion,
        fecha,
        cupo,
        disponible
      });

      if(productoResponse==400){
        console.log("Ya existe un producto con ese nombre.");
        setTitleError("Error");
        setError("Ya existe un producto con ese nombre.");
        setModalErrorVisible(true);
        return;
      } else {

      const responseCargarImagen = await fetchCargarImagen({
        imgPath: imagenes,
        altText: "Img",
        producto: {
          id: Number(productoResponse)
        }
      });

      setTitleError("Producto registrado");
      setError("El producto ha sido registrado con éxito.");
      setModalErrorVisible(true);

      setNombre("");
      setDescripcion("");
      setFecha("");
      setCupo(0);
      setDisponible(true);
      setImagenes(null);
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
      <h2 className={RpStyles.title}> Registro de productos </h2>

      {modalErrorVisible && (
        <ErrorComponent
          title={titleError}
          message={error}
          onClose={closeModal}
        />
      )}

      <form onSubmit={handleSubmit}>
    
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