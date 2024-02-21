import React from "react";
import Searcher from "../../Components/searcher/Searcher";
import Category from "../../Components/category/Category";
import Recommended from "../../Components/recommended/Recommended";
import HomeStyles from "./Home.module.css";
import Banner from "../../Components/banner/Banner";

const Home = () => {

    return(
        <div >
            <div>
                <Searcher/>
            </div>
            <div>
                <Banner/>
            </div>
            <div>
               <Recommended/>
            </div>
            <div>
                <Category/>
            </div>
        
        </div>
    )
}

export default Home;