import React from "react";

import Searcher from "../../components/searcher/Searcher";
import Category from "../../components/category/Category";
import Banner from "../../components/banner/Banner";
import Header from "../../components/header/Header";

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