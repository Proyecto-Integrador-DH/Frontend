import React, { useEffect, useState } from "react";
import { fetchCategoryProducts, fetchCategoria } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import { useParams, Link } from "react-router-dom";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const cargarCategoria = async () => {
      const id = Number(categoryId);
      try {
        const data = await fetchCategoria(id);
        setCategoria(data);
      } catch (error) {
        console.error(errorHandling(error));
      }
    };
    cargarCategoria();
  }, [categoryId]);

  useEffect(() => {
    const loadProducts = async () => {
      const id = Number(categoryId);
      try {
        const data = await fetchCategoryProducts(id);
        setProductos(data[0].productos);
        console.log("Productos: ", data[0].productos);
      } catch (error) {
        console.error(errorHandling(error));
      }
    };

    if (categoryId) {
      loadProducts();
    }
  }, [categoryId]);

  return (
    <div className="overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">
        Experiencias de la categoría
        <span className="capitalize">
          <br /> {categoria && categoria.nombre}
        </span>
      </h2>
      <div className="overflow-x-auto">
        <table className="whitespace-nowrap table-auto">
          <thead>
            <tr>
              <th>Nombre de la Experiencia</th>
              <th></th>
              <th>Descripción</th>
              <th>Ver detalle</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.Id}>
                <td>{producto.nombre}</td>
                <td>
                  <img
                    src={producto.imagenes[0].url}
                    className="object-cover h-30 w-70 rounded"
                  />
                </td>
                <td className="whitespace-normal text-justify">
                  {producto.descripcion}
                </td>
                <td>
                  <div className="flex justify-end">
                  <Link to={`/details/${producto.Id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Ver más
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
