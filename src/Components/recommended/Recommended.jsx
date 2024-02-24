import React from "react";
import RecommendedStyles from "./Recommended.module.css";
import imagenCard from "../../assets/playaDelCarmen.png";

const Recommended = () => {

    return (
        <div>
            <div className={RecommendedStyles.recommendedContainer}>
                <div className={RecommendedStyles.tittleContainer}>
                    <h2>
                        Recomendados
                    </h2>
                    <h3>
                        Explora nuestros planes
                    </h3>
                </div>
                <div className={RecommendedStyles.buttonContainer}>
                    <button className={RecommendedStyles.buttonLeft}>
                        {String.fromCharCode(0x003C)} {/* Carácter '<' */}
                    </button>
                    <button className={RecommendedStyles.buttonRight}>
                        {String.fromCharCode(0x003E)} {/* Carácter '>' */}
                    </button>
                </div>


            </div>
            <div className={RecommendedStyles.cardContainer}>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                    <div className={RecommendedStyles.imagenContainer}>
                        <img src={imagenCard} alt="" />
                    </div>
                    <div>
                        <p>Playa del carmen</p>
                        <p>U$D 300</p>
                        
                    </div>
                    <button className={RecommendedStyles.verDetalles}>ver detalle</button>
                </div>
            </div>
            <button>ver todo</button>
        </div>

    )

}

export default Recommended;