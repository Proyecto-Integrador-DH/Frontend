import React from "react";
import ImagenBanner from "../../assets/Banner.png"
import BannerStyles from "./Banner.module.css";
import Button from "../button/Button.jsx"

const Banner = () => {

    return (
        <div className={BannerStyles.bannerContainer}>
            <div className={BannerStyles.bannerDivOne}>
                <Button />
                <h2>Desde</h2> 
                <h2>Colombia </h2>
                <h3>hasta Argentina </h3>
                <p>Recuerda que nunca es tarde para cumplir tus sueños </p>
                <p>aventureros, ¡así que planea tu próxima travesía con nosotros en cualquier momento!</p>
            </div>
            <div className={BannerStyles.bannerDivTwo}>

            </div>
        </div>
    )
}

export default Banner;