import React, { useEffect, useState } from "react";
import CategoryStyle from "./Category.module.css";
import ImageCategorys from "../../assets/ChinaCategorias.png"
import ImageCiudad from "../../assets/Ciudad.png";
import ImagenNaturaleza from "../../assets/Naturaleza.png";
import ImageBienestar from "../../assets/Bienestar.png";
import ImageHistoria from "../../assets/Historia.png";
import { fetchCategorias } from "../../services/api";
import { errorHandling } from "../../services/errorHandling";
import { Link } from "react-router-dom";

const Category = () => {
    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); 

    useEffect(() => {
        fetchCategorias()
            .then(data => setCategorias(data))
            .catch(error => {
                console.error(errorHandling(error));
            });
    }, []);
    
    const handleClickCategory = (category) => {
        const categoriaSeleccionada = categorias.find(cat => cat.nombre.toLowerCase() === category.toLowerCase());
        if (categoriaSeleccionada) {
            const categoryId = categoriaSeleccionada.id;
            setSelectedCategory(categoryId); 
        }
    }

    return (
        <div>
            <div className={CategoryStyle.categoryContainer}>
                <div className={CategoryStyle.recommended}>
                    <img src={ImageCategorys} alt="no funciona" />
                </div>
                <div className={CategoryStyle.category}>
                    <h2>CATEGORIAS</h2>
                    <h3 className="w-full mb-5">Encuentra la experiencia de tus sueños</h3>
                    <div className={CategoryStyle.categoryLinks}>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={CategoryStyle.cityAndNigth} 
                            onClick={() => handleClickCategory("Ciudad y Noche")}
                        >
                            <img className={CategoryStyle.cityImg} src={ImageCiudad} alt=""/>
                            <p>Ciudad y Noche</p>
                        </Link>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={CategoryStyle.adventureAndNature} 
                            onClick={() => handleClickCategory("Aventura y Naturaleza")}
                        >
                            <img className={CategoryStyle.natureImg} src={ImagenNaturaleza} alt="" />
                            <p>Aventura y Naturaleza</p>
                        </Link>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={CategoryStyle.cultureAndHeritage} 
                            onClick={() => handleClickCategory("Cultura y Patrimonio")}
                        >
                            <img className={CategoryStyle.historyImg} src={ImageHistoria} alt="" />
                            <p>Cultura y Patrimonio</p>
                        </Link>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={CategoryStyle.welfareAndCouching} 
                            onClick={() => handleClickCategory("Bienestar y Coaching")}
                        >
                            <img className={CategoryStyle.walfareImg} src={ImageBienestar} alt=""/>
                            <p>Bienestar y Coaching</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
