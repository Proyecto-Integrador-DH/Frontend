import "./App.css";
import { Route, Routes } from "react-router";
import Products from "./Routes/Products.jsx";
import HomePage from "./Pages/home/Home.jsx";
import RegisterProducts from './components/registerProduct/RegisterProducts.jsx';
import Details from './Routes/Details.jsx';
import Header from "./components/header/Header.jsx";

function App() {

  return (
      <>
      <Header/>
        <Routes>
          <Route path='/Products' element={<Products/>}/>
          <Route path='/' element={ <HomePage/>}/>
          <Route path='/registrarProducto' element={<RegisterProducts/>}/>
          <Route path='/Details' element={<Details/>}/>
        </Routes>
      </>
  );
}

export default App;
