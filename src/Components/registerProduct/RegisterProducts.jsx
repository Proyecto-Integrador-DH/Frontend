import React from "react";
import RpStyles from "./RegisterProducts.module.css";
import { useState } from "react";

const RegisterProducts = () => {
    // Estados para manejar los valores del formulario
    const [nameProduct, setNameProduct] = useState ("");     //Manjea el valor del nombre
    const [description, setDescription] = useState ("");     //Manjea el valor de la descripcion
    const [price, setPrice] = useState ("");                 //Manjea el valor del precio
    const [quotaOfPeople, setQuotaOfPeople] = useState (""); //Manjea el valor de la cantidad de personar que pueden enotarse en este viaje
    const [imagen, setImagen] = useState(null)               //Manjea las imagenes del producto

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtenemos el primer archivo seleccionado
        setImagen(file);
      };

    return (
        <div className={RpStyles.formContainer}>

          <h2 className={RpStyles.title} > Registro de productos </h2>

        <form onSubmit={handleSubmit}>
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
          accept="image/*" // Acepta solo archivos de imagen
          onChange={handleImagenChange}
          required
        />
      </label>
      
      
      
      
      <button type="submit">Agregar Producto</button>
    </form>
        </div>
        
    )
}

export default RegisterProducts;
