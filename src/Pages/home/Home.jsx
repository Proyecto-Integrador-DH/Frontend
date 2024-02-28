import React from "react";
import Searcher from "../../components/searcher/Searcher";
import Category from "../../components/category/Category";
import Banner from "../../components/banner/Banner";
import Recommended from "../../components/recommended/Recommended";
import Footer from "../../components/footer/Footer";

const HomePage = () => {
  return (
    <div>

      <Searcher />

      <Banner />

      <Recommended />

      <Category />

      <Footer />
      
    </div>
  );
};


export default HomePage;
