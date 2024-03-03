import "./App.css";
import { Route, Routes } from "react-router";
import Products from "./Routes/Products.jsx";
import HomePage from "./Pages/home/Home.jsx";
import RegisterProducts from './components/registerProduct/RegisterProducts.jsx';
import Details from './Routes/Details.jsx';
import Header from "./components/header/Header.jsx";
import Admin from "./Pages/Administracion/Admin.jsx";
import ListProducts from "./components/ListProduct/ListProducts.jsx";
import AsignarCategoria from "./Components/AsignarCategoria/AsignarCategoria.jsx";




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
        </Routes>

      </>
  );
}

export default App;