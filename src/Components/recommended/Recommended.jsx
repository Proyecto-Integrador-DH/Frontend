import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendedStyles from "./Recommended.module.css";
import imagenCard from "../../assets/playaDelCarmen.png";

const Recommended = () => {
  const [showAll, setShowAll] = useState(false);
  const carouselRef = useRef(null);

  const handleToggleClick = () => {
    setShowAll(!showAll);
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slickPrev();
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: showAll ? 10 : 3, // Cambiado dinámicamente según el estado showAll
    slidesToScroll: 1,
  };

  const recommendedItems = [...Array(showAll ? 10 : 3)].map((_, index) => (
    <div key={index} className={RecommendedStyles.cardRecommended}>
      <div className={RecommendedStyles.imagenContainer}>
        <img src={imagenCard} alt="" />
      </div>
      <div>
        <p>Playa del Carmen</p>
        <p>U$D 300</p>
        <button className={RecommendedStyles.verDetalles}>Ver detalle</button>
      </div>
    </div>
  ));

  return (
    <div className={RecommendedStyles.recommendedBloque}>
      <div className={RecommendedStyles.headerRecomendados}>
        <div className={RecommendedStyles.recommendedContainer}>
          <div className={RecommendedStyles.tittleContainer}>
            <h2>Recomendados</h2>
            <h3>Explora nuestros planes</h3>
          </div>
          <div className={RecommendedStyles.navigationArrows}>
            <button className={RecommendedStyles.flecha} onClick={handlePrev}>
              <div className={RecommendedStyles.back}></div>
            </button>
            <button className={RecommendedStyles.flecha} onClick={handleNext}>
              <div className={RecommendedStyles.next}></div>
            </button>
          </div>
        </div>
      </div>

      <div className={RecommendedStyles.customCarousel}>
        <Slider ref={carouselRef} {...sliderSettings}>
          {recommendedItems}
        </Slider>

        <button className={RecommendedStyles.verMas} onClick={handleToggleClick}>
          {showAll ? "Ver menos" : "Ver mas"}
        </button>
      </div>
    </div>
  );
};

export default Recommended;

