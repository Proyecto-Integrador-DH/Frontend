import "./App.css";
import { Route, Routes } from "react-router";
import Products from "./Routes/Products.jsx";
import HomePage from "./Pages/home/Home.jsx";
import RegisterProducts from './Components/registerProduct/RegisterProducts.jsx';
import Details from './Routes/Details.jsx';
import Header from "./Components/header/Header.jsx";
import Admin from "./Pages/Administracion/Admin.jsx";
import ListProducts from "./Components/ListProduct/ListProducts.jsx";
import AsignarCategoria from "./Components/AsignarCategoria/AsignarCategoria.jsx";
import RegisterUser from "./Components/registerUser/RegisterUser.jsx";




function App() {

  return (
      <>
      <Header/>
        <Routes>
          <Route path='/productos' element={<Products/>}/>
          <Route path='/' element={ <HomePage/>}/>
          <Route path='/registrarProducto' element={<RegisterProducts/>}/>
          <Route path='/details/:id' element={<Details/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/listarProductos' element={<ListProducts/>}/>
          <Route path='/asignarCategoria' element={<AsignarCategoria/>}/>
          <Route path='/registroDeUsuario' element={<RegisterUser/>}/>
        </Routes>

      </>
  );
}

export default App;