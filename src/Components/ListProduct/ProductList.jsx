import React, { useEffect, useState } from "react";
import { fetchCategoryProducts, fetchCategoria } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import { useParams, Link } from "react-router-dom";
import FavoriteButton from "../Favorite/Favorite";
import Card from "../Card/Card.jsx";
import Footer from '../footer/Footer.jsx'
import Loading from "../Loading/Loading.jsx";
import { set } from "date-fns";

const ProductList = ({ clienteId }) => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("categoryId:", categoryId);
    const cargarCategoria = async () => {
      const id = Number(categoryId);
      try {
        setLoading(true);
        const data = await fetchCategoria(id);
        setCategoria(data);
      } catch (error) {
        console.error(errorHandling(error));
      } finally {
        setLoading(false);
      }
    };
    cargarCategoria();
  }, [categoryId]);

  useEffect(() => {
    const loadProducts = async () => {
      console.log("categoryId:", categoryId);
      const id = Number(categoryId);
      try {
        setLoading(true);
        const data = await fetchCategoryProducts(id);
        setProductos(data[0].productos);
      } catch (error) {
        console.error(errorHandling(error));
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      loadProducts();
    }
  }, [categoryId]);

  if (loading) return <Loading />;

  return (
    <div className="overflow-hidden mt-20">
      <h2 className="text-3xl font-bold mb-6">
        Experiencias de la categoría
        <span className="capitalize">
          <br /> {categoria && categoria.nombre}
        </span>
      </h2>
      <div className="grid mobil:grid-cols-1 md:grid-cols-2 gap-6 m-5">
        {productos.map((producto) => (
          <div key={producto.Id} className="border rounded p-4 shadow-md">
            <Card producto={producto} />
            <div className="flex justify-between mt-4">
              <div>
                <FavoriteButton
                  clienteId={clienteId}
                  productoId={producto.Id}
                />
              </div>
              <div>
                <Link
                  to={`/details/${producto.Id}`}
                  className="text-blue-500 hover:underline"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default ProductList;
