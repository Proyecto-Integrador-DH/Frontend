import React from "react";
import ImagenBanner from "../../assets/Image02.png"
import Explorer from "../../assets/Frame 6.png"
import BannerStyles from "./Banner.module.css";
import Button from "../button/Button.jsx";
import ImagenBody from "../../assets/Image02.png";

const Banner = () => {

    return (
        <div className={BannerStyles.bannerContainer}>
            <div className={BannerStyles.bannerDivOne}>
                <img className="mt-4" src= {Explorer} alt="banner"/>
                <h2>Desde</h2> 
                <h2>Colombia </h2>
                <h3>hasta Argentina </h3>
                <p>Recuerda que nunca es tarde para cumplir tus sueños aventureros, ¡así que planea tu próxima travesía con nosotros en cualquier momento!</p>
            </div>
            <div className={BannerStyles.bannerDivTwo}>
                <img src= {ImagenBanner} alt="banner"/>
            </div>
        </div>
    )
}

export default Banner;
