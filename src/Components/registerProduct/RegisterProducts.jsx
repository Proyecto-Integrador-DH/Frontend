import React, { useState } from "react";
import RpStyles from "./RegisterProducts.module.css";
import axios from "axios";

const RegisterProducts = () => {
  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quotaOfPeople, setQuotaOfPeople] = useState("");
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/products', { name: nameProduct });

      setError(null);

     console.log(data)

    } catch (error) {
      setError(error.response.data.error);
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
          <ErrorComponent
            title="Error al registrar producto"
            message={error}
          />
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
