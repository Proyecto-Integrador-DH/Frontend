import React from "react";
import Searcher from "../../components/searcher/Searcher";
import Category from "../../components/category/Category";
import Banner from "../../components/banner/Banner";
import Header from "../../components/header/Header";
import Recommended from "../../components/recommended/Recommended";

const HomePage = () => {

    return(
        <div>
           
                <Searcher/>
            
                <Banner/>

                <Recommended/>
            
                <Category/>
              
        
        </div>
    )
}

export default HomePage;