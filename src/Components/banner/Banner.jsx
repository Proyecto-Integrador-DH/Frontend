import React from "react";
import ImagenBanner from "../../assets/Banner.png"
import BannerStyles from "./Banner.module.css";

const Banner = () => {

    return (
        <div className={BannerStyles.bannerImageContainer}>
            <img src={ImagenBanner} alt="" />
        </div>
    )
}

export default Banner;