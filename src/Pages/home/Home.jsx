import React from "react";
import Category from "../../Components/category/Category";
import Banner from "../../Components/banner/Banner";
import Recommended from "../../Components/recommended/Recommended";
import Footer from "../../Components/footer/Footer";
import SearchForm from "../../Components/searcher/SearcherForm";

const HomePage = () => {
  return (
    <div>
      <SearchForm />
      
      <Banner />

      <Recommended />

      <Category />

      <Footer />
      
    </div>
  );
};

export default HomePage;
