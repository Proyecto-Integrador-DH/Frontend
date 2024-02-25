import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendedStyles from "./Recommended.module.css";
import imagenCard from "../../assets/playaDelCarmen.png";

const Recommended = () => {
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef(null);

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
            className={RecommendedStyles.flecha.back}
            onClick={() => sliderRef.current.slickPrev()}
            style={!showAll ? { display: "block" } : { display: "none" }}
          >
            {"<"}
          </button>
          <button
            className={RecommendedStyles.flecha.next}
            onClick={() => sliderRef.current.slickNext()}
            style={!showAll ? { display: "block" } : { display: "none" }}
          >
            {">"}
          </button>
        </div>
      </div>
      

      <Slider
        ref={sliderRef}
        {...(showAll ? allProductsSliderSettings : sliderSettings)}
      >
        {[...Array(showAll ? 10 : 3)].map((_, index) => (
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
      </Slider>

      <button className= {RecommendedStyles.verMas} onClick={handleToggleClick}>
        {showAll ? "Ver menos" : "Ver mas"}
      </button>
    </div>
  );
};

export default Recommended;

