import "./App.css";
import { Route, Routes } from "react-router";
import Products from "./Routes/Products.jsx";
import HomePage from "./Pages/home/Home.jsx";
import RegisterProducts from './Components/registerProduct/RegisterProducts.jsx';
import Details from './Routes/Details.jsx';
import Header from "./Components/header/Header.jsx";
import Login from "./Routes/Login.jsx";
import Admin from "./Pages/Administracion/Admin.jsx";
import ListProducts from "./Components/ListProduct/ListProducts.jsx";
import AsignarCategoria from "./Components/AsignarCategoria/AsignarCategoria.jsx";
import ListarUsuarios from "./Components/ListarUsuarios/ListarUsuarios.jsx";
import RegisterUser from "./Components/registerUser/RegisterUser.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { fetchEmail } from "./services/api.js";
import { errorHandling } from "./services/errorHandling.js";
import Caracteristicas from './Components/Caracteristicas/Caracteristicas.jsx'
import AsignarCaracteristica from "./Components/AsignarCaracteristica/AsignarCaracteristica.jsx";

function App() {

  const [user, setUser] = useState(null);
  const [email,setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("token decodificado:", decodedToken);
      console.log("email:", decodedToken.sub);
      setEmail(decodedToken.sub);
    }
  }, [])

  useEffect(() => {
    fetchEmail(email)
    .then(data => {
      setUser(data);
      console.log("Info de usuario", user);
    })
    .catch(error => {
      console.error(errorHandling(error));
    });
}
,[]);



  





  return (
    <>
      <Header />
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/registrarProducto' element={<RegisterProducts />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/listarProductos' element={<ListProducts />} />
        <Route path='/asignarCategoria' element={<AsignarCategoria />} />
        <Route path='/listarUsuarios' element={<ListarUsuarios />} />
        <Route path='/crearUsuario' element={<RegisterUser />} />
        <Route path='/caracteristicas' element={<Caracteristicas />} />
        <Route path='/asignarCaracteristica' element={<AsignarCaracteristica />} />
      </Routes>

    </>
  );
}

export default App;