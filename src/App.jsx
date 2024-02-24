import './App.css'
import { Route, Routes } from 'react-router'
import Products from './Routes/Products.jsx'
import HomePage from "./Pages/home/Home.jsx";


function App  ()  {

  return (
    <>
      
        <Routes>
          <Route path='/Products' element={<Products/>}/>
          <Route path='/' element={ <HomePage/>}/>
          <Route path='/error' element={<ErrorComponent/>}/>
        </Routes>
        
    </>
  )
}

export default App
