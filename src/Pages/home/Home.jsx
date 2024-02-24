import React from "react";
import Searcher from "../../Components/searcher/Searcher";
import Category from "../../Components/category/Category";
import Recommended from "../../Components/recommended/Recommended";
import HomeStyles from "./Home.module.css";
import Banner from "../../Components/banner/Banner";
import Header from "../../Components/header/Header"
import RegisterProducts from "../../Components/registerProduct/RegisterProducts.jsx"

const Home = () => {

    return(
        <div >
            
                <Header/>
            
           
                <Searcher/>
            
           
                <Banner/>
           
            
                <Category/>
              
           
           

                
         
        
        </div>
    )
}

export default Home;