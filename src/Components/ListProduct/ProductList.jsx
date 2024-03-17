import React, { useEffect, useState } from "react";
import { fetchCategoryProducts, fetchCategoria } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import { useParams, Link } from "react-router-dom";
import FavoriteButton from "../Favorite/Favorite";

const ProductList = ({ clienteId }) => {
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
      <div className="grid grid-cols-2 gap-6 m-5">
        {productos.map((producto) => (
          <div key={producto.Id} className="border rounded p-4">
            <img
              src={producto.imagenes[0].url}
              className="object-cover h-40 w-full mb-4"
              alt={producto.nombre}
            />
            <div className="relative">
              <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
              <div className="absolute top-0 right-0 mr-5">
                <FavoriteButton
                  clienteId={clienteId}
                  productoId={producto.Id}
                />
              </div>
            </div>

            <p className="text-sm mb-4 text-justify">{producto.descripcion}</p>
            <div className="flex justify-end">
              <Link
                to={`/details/${producto.Id}`}
                className="text-blue-500 hover:underline"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
