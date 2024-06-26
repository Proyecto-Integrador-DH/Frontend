import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendedStyles from "./Recommended.module.css";
import VerMas from "../botonVerMas/BotonVerMas";
import { fetchListarProductosRecom } from "../../services/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const Recommended = () => {
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef(null);
  const [productosApi, setProductosApi] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const defaultImage = "https://via.placeholder.com/150";

  const fetchApiData = async () => {
    try {
      setLoading(true);
      const data = await fetchListarProductosRecom();

      if (Array.isArray(data)) {
        setProductosApi(data);
      } else {
        console.error("fetchListarProductos no devolvió un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const allProductsSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const handleToggleClick = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className={RecommendedStyles.recommendedBloque}>
      <div className={RecommendedStyles.headerRecomendados}>
        <div className={RecommendedStyles.recommendedContainer}>
          <div className={RecommendedStyles.tittleContainer}>
            <h2>RECOMENDADOS</h2>
            <h3>Explora nuestros planes</h3>
          </div>
        </div>

        <div className={RecommendedStyles.navigationArrows}>
          <button
            className={RecommendedStyles.back}
            onClick={() => sliderRef.current.slickPrev()}
            style={!showAll ? { display: "block" } : { display: "none" }}
          >
            {"<"}
          </button>
          <button
            className={RecommendedStyles.next}
            onClick={() => sliderRef.current.slickNext()}
            style={!showAll ? { display: "block" } : { display: "none" }}
          >
            {">"}
          </button>
        </div>
      </div>
      {showAll ? (
      <div className={RecommendedStyles.showAll}>
        {productosApi.map((product, index) => (
          <div key={index} className={RecommendedStyles.cardRecommended2}>
            <div className={RecommendedStyles.imagenContainer}>
              {product.imagenes.length > 0 ? (
                <img src={product.imagenes[0].url} alt={product.imagenes[0].altText} />
              ) : (
                <img src={defaultImage} alt="Imagen por defecto" />
              )}
            </div>
            <div>
              <p>{product.nombre}</p>
            </div>
            <Link to={`/details/${product.Id}`}>
              <button className={RecommendedStyles.verDetalles}>
                Ver detalle
              </button>
            </Link>
          </div>
        ))}
      </div>
    ) : (
      <Slider
        ref={sliderRef}
        {...(showAll ? allProductsSliderSettings : sliderSettings)}
      >
        {productosApi.map((product, index) => (
          <div key={index} className={RecommendedStyles.cardRecommended}>
            <div className={RecommendedStyles.imagenContainer}>
              {product.imagenes.length > 0 ? (
                <img
                  src={product.imagenes[0].url}
                  alt={product.imagenes[0].altText}
                />
              ) : (
                <img src={defaultImage} alt="Imagen por defecto" />
              )}
            </div>
            <div>
              <p className="mt-3 mb-1 font-medium">{product.nombre}</p>
            </div>
            <Link to={`/details/${product.Id}`}>
              <button className={RecommendedStyles.verDetalles}>
                Ver detalle
              </button>
            </Link>
          </div>
        ))}
      </Slider>
    )}

    <VerMas onClick={handleToggleClick} isExpanded={showAll} />
  </div>
);
};

export default Recommended;
