import "./App.css";
import { Route, Routes } from "react-router";
import Products from "./Routes/Products.jsx";
import HomePage from "./Pages/home/Home.jsx";
import RegisterProducts from './Components/registerProduct/RegisterProducts.jsx';

function App() {

  return (
      <>
        <Routes>
          <Route path='/Products' element={<Products/>}/>
          <Route path='/' element={ <HomePage/>}/>
          <Route path='/registrarProducto' element={<RegisterProducts/>}/>
        </Routes>
      </>
  );
}

export default App;
