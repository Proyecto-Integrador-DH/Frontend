import { useState } from 'react'
import RegisterProduct from "./Components/registerProduct/RegisterProducts.jsx"
import Home from "./Pages/home/Home.jsx"
import './App.css'
import Header from "./components/header/Header.jsx";
import Card from './components/Card/Card'
import { Route, Routes } from 'react-router'
import Products from './Routes/Products.jsx'
function App  ()  {

  return (
    <>
       <Header/>
        <Routes>
          <Route path='/Products' element={<Products/>}/>
        </Routes>
    </>
  )
}

export default App
