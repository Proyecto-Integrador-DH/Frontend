import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import Card from './components/Card/Card'
import { Route, Routes } from 'react-router'
import Products from './Routes/Products.jsx'
import Details from './Routes/Details.jsx'
function App() {

  return (
    <>
       <Header/>
        <Routes>
          <Route path='/Products' element={<Products/>}/>
          <Route path='/Details' element={<Details/>}/>
        </Routes>
    </>
  )
}

export default App
