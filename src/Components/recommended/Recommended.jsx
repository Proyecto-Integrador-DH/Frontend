import React from "react";
import RecommendedStyles from "./Recommended.module.css";

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
                    Card 1
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 2
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 3
                </div>
                <div className={RecommendedStyles.cardRecommended}> 
                Card 4
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 5
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 6
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 7
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 8
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 9
                </div>
                <div className={RecommendedStyles.cardRecommended}>
                Card 10
                </div>
            </div>
            <button>ver todo</button>
            </div>

    )

}

export default Recommended;