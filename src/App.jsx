import './App.css'
import { Route, Routes } from 'react-router'
import Products from './Routes/Products.jsx'
import Home from "./Pages/home/Home";


function App  ()  {

  return (
    <>
      
        <Routes>
          <Route path='/Products' element={<Products/>}/>
          <Route path='/Home' element={ <Home/>}/>
        </Routes>
        
    </>
  )
}

export default App
