import React, { useState, useEffect } from "react";
import RpStyles from "./RegisterProducts.module.css";
import { fetchProductoNuevo } from "../../services/api";
import ErrorComponent from "../error/ErrorMessage";

const RegisterProducts = () => {
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quotaOfPeople, setQuotaOfPeople] = useState("");
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchProductoNuevo()
      .then((response) => response.json())
      .catch((error) => {
        if (error.message.includes("400")) {
          setError({
            title: "Error de solicitud",
            message: "Hubo un problema al cargar los datos.",
          });
        } else {
          setError({
            title: "Error al cargar datos",
            message: "Hubo un problema al cargar los datos.",
          });
        }
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        nameProduct,
        description,
        price,
        quotaOfPeople,
        imagen,
      };

      const response = await fetchProductoNuevo(data);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success) {
        setSuccessMessage("Producto registrado con éxito");
      } else {
        setError({
          title: "Error al registrar producto",
          message:
            "Hubo un problema al registrar el producto. Inténtalo de nuevo más tarde.",
        });
      }
    } catch (error) {
      console.error(error);

      setError({
        title: "Error al registrar producto",
        message:
          "Hubo un problema al registrar el producto. Inténtalo de nuevo más tarde.",
      });
    }
  };
  

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

  return (
    <div className={RpStyles.formContainer}>
      <h2 className={RpStyles.title}> Registro de productos </h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <ErrorComponent title={error.title} message={error.message} />
        )}

        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        <label>
          <input
            type="text"
            value={nameProduct}
            placeholder="Nombre"
            onChange={(e) => setNameProduct(e.target.value)}
            required
          />
        </label>

        <label>
          <textarea
            value={description}
            placeholder="Descripcion"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="number"
            value={price}
            placeholder="Precio"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="number"
            value={quotaOfPeople}
            placeholder="Maximo de personas"
            onChange={(e) => setQuotaOfPeople(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            required
          />
        </label>

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default RegisterProducts;
