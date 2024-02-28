import React from "react";
import Searcher from "../../components/searcher/Searcher";
import Category from "../../components/category/Category";
import Banner from "../../components/banner/Banner";
import Header from "../../components/header/Header";
import Recommended from "../../components/recommended/Recommended";
import RegisterUser from "../../components/registerUser/RegisterUser";

const HomePage = () => {

    return(
        <div>
            
                <Header/>
            
                <Searcher/>
            
                <Banner/>

                <Recommended/>
            
                <Category/>

                <RegisterUser/>
              
        
        </div>
    )
}

export default HomePage;