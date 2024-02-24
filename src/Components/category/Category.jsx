import React from "react";
import CategoryStyle from "./Category.module.css";
import ImageCategorys from "../../assets/ChinaCategorias.png"
import ImageCiudad from "../../assets/Ciudad.png";
import ImagenNaturaleza from "../../assets/Naturaleza.png";
import ImageBienestar from "../../assets/Bienestar.png";
import ImageHistoria from "../../assets/Historia.png";

const Category = () => {

    return (

        <div className={CategoryStyle.categoryContainer}>
            <div className={CategoryStyle.recommended}>
                <img src={ImageCategorys} alt="no funciona" />
            </div>
            <div className={CategoryStyle.category}>
                <h2>Categorias</h2>
                <h3>Encuentra las experiencias de tus sueños</h3>
                <div className={CategoryStyle.categoryLinks}>
                    <div className={CategoryStyle.cityAndNigth}>
                        <img className={CategoryStyle.cityImg} src={ImageCiudad} alt="" />
                        <p>Ciudad y Noche</p>
                    </div>
                    <div className={CategoryStyle.adventureAndNature}>
                        <img className={CategoryStyle.natureImg} src={ImagenNaturaleza} alt="" />
                        <p>Aventura y Naturaleza</p>
                    </div>
                    <div className={CategoryStyle.cultureAndHeritage}>
                        <img className={CategoryStyle.historyImg} src={ImageHistoria} alt="" />
                        <p>Cultura y Patrimonio</p>
                    </div>
                    <div className={CategoryStyle.welfareAndCouching}>
                        <img className={CategoryStyle.walfareImg} src={ImageBienestar} alt="" />
                        <p>Bienestar y Couching</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Category;