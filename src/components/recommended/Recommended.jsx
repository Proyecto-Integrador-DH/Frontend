import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendedStyles from "./Recommended.module.css";
import imagenCard from "../../assets/playaDelCarmen.png";
import VerMas from "../botonVerMas/BotonVerMas";
import { fetchCategorias } from "../../services/api";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef(null);
  const [productosApi, setProductosApi] = useState([]);

  const fetchApiData = () => {
    //se llama a la funcion de api.js y se guarda en esta funcion
    //setProductosApi(fetchCategorias());
    setProductosApi([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
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
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const handleToggleClick = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div className={RecommendedStyles.recommendedBloque}>
      <div className={RecommendedStyles.headerRecomendados}>
        <div className={RecommendedStyles.recommendedContainer}>
          <div className={RecommendedStyles.tittleContainer}>
            <h2>Recomendados</h2>
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
            <div key={index} className={RecommendedStyles.cardRecommended}>
              <div className={RecommendedStyles.imagenContainer}>
                <img src={imagenCard} alt="" />
              </div>
              <div>
                <p>Playa del Carmen</p>
                <p>U$D 300</p>
              </div>
              <Link to={`/details/${index}`}>
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
                <img src={imagenCard} alt="" />
              </div>
              <div>
                <p>Playa del Carmen</p>
                <p>U$D 300</p>
              </div>
              <Link to={`/details/${index}`}>
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

{
  /* {[...Array(showAll ? 10 : 3)].map((_, index) => (
          <div key={index} className={RecommendedStyles.cardRecommended}>
            <div className={RecommendedStyles.imagenContainer}>
              <img src={imagenCard} alt="" />
            </div>
            <div>
              <p>Playa del Carmen</p>
              <p>U$D 300</p>
            </div>
            <button className={RecommendedStyles.verDetalles}>
              Ver detalle
            </button>
          </div>
        ))}
      </Slider> */
}
