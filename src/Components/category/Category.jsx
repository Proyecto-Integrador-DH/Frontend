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
import Loading from "../Loading/Loading";

const Category = () => {
    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategorias()
            .then(data => {
                setLoading(true);
                setCategorias(data);
            })
            .catch(error => {
                console.error(errorHandling(error));
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    const handleClickCategory = (category) => {
        const categoriaSeleccionada = categorias.find(cat => cat.nombre.toLowerCase() === category.toLowerCase());
        if (categoriaSeleccionada) {
            const categoryId = categoriaSeleccionada.id;
            setSelectedCategory(categoryId); 
        }
    }

    if (loading) return <Loading />;

    return (
        <div>
            <div className={CategoryStyle.categoryContainer}>
                <div className={CategoryStyle.recommended}>
                    <img src={ImageCategorys} alt="no funciona" />
                </div>
                <div className={CategoryStyle.category}>
                    <h2 className="mb-2 md:pl-5 lg:pl-0">CATEGORIAS</h2>
                    <h3 className="md:pl-5 lg:pl-0 w-full">Encuentra la experiencia de tus sueños</h3>
                    <div className={`${CategoryStyle.categoryLinks}`}>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={`${CategoryStyle.cityAndNigth} bg-white h-36 md:h-full lg:max-h-36 lg:max-w-64`}  
                            onClick={() => handleClickCategory("Ciudad y Noche")}
                        >
                            <img className={`${CategoryStyle.cityImg} rounded-3xl `}  src={ImageCiudad} alt=""/>
                            <p>Ciudad y Noche</p>
                        </Link>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={`${CategoryStyle.adventureAndNature} bg-white h-36 md:h-full lg:max-h-36 lg:max-w-64`} 
                            onClick={() => handleClickCategory("Aventura y Naturaleza")}
                        >
                            <img className={`${CategoryStyle.natureImg} rounded-3xl`} src={ImagenNaturaleza} alt="" />
                            <p>Aventura y Naturaleza</p>
                        </Link>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={`${CategoryStyle.cultureAndHeritage} bg-white h-36 md:h-full lg:max-h-36 lg:max-w-64`}
                            onClick={() => handleClickCategory("Cultura y Patrimonio")}
                        >
                            <img className={`${CategoryStyle.historyImg} rounded-3xl`} src={ImageHistoria} alt="" />
                            <p>Cultura y Patrimonio</p>
                        </Link>
                        <Link 
                            to={`/listarProductos/${selectedCategory}`} 
                            target="_blank" 
                            className={`${CategoryStyle.welfareAndCouching} h-36 md:h-full lg:max-h-36 lg:max-w-64`} 
                            onClick={() => handleClickCategory("Bienestar y Coaching")}
                        >
                            <img className={`${CategoryStyle.walfareImg} rounded-2xl`} src={ImageBienestar} alt=""/>
                            <p>Bienestar y Coaching</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
