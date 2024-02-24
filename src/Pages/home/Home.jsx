import React from "react";
import Searcher from "../../Components/searcher/Searcher";
import Category from "../../Components/category/Category";
import Banner from "../../Components/banner/Banner";
import Header from "../../Components/header/Header";
import Recommended from "../../Components/recommended/Recommended";

const HomePage = () => {

    return(
        <div>
            
                <Header/>
            
           
                <Searcher/>
            
                <Banner/>

                <Recommended/>
            
                <Category/>
              
        
        </div>
    )
}

export default HomePage;