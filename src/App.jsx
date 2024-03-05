import "./App.css";
import { Route, Routes } from "react-router";
import Products from "./Routes/Products.jsx";
import HomePage from "./Pages/home/Home.jsx";
import RegisterProducts from './Components/registerProduct/RegisterProducts.jsx';
import Details from './Routes/Details.jsx';
import Header from "./Components/header/Header.jsx";
import Login from "./Routes/Login.jsx";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchEmail } from "./services/api.js";

function App() {

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwtDecode(token); 
      console.log(decodedToken);
      const usuario = fetchEmail({email: decodedToken.email});
      console.log(usuario);
    }
  }, [])

  




  return (
      <>
      <Header/>
        <Routes>
          <Route path='/products' element={<Products/>}/>
          <Route path='/' element={ <HomePage/>}/>
          <Route path='/registrarProducto' element={<RegisterProducts/>}/>
          <Route path='/details/:id' element={<Details/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </>
  );
}

export default App;