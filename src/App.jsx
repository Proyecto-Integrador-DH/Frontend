import "./App.css";
import { Route, Routes } from "react-router";
import Products from "./Routes/Products.jsx";
import HomePage from "./Pages/home/Home.jsx";
import RegisterProducts from "./Components/registerProduct/RegisterProducts.jsx";
import Details from "./Routes/Details.jsx";
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
import { fetchEmail, fetchObtenerClienteByUsuario } from "./services/api.js";
import { errorHandling } from "./services/errorHandling.js";
import ProtectedRoutes from "./router/ProtectedRoutes.jsx";
import ProductList from "./Components/ListProduct/ProductList.jsx";
import Agenda from "./Components/Agenda/Agenda.jsx";
import AgendaProducto from "./Components/Agenda/AgendaProducto.jsx";
import Reserva from "./Components/Reserva/Reserva.jsx";
import CrearClienteForm from "./Components/Cliente/Cliente.jsx";
import PanelUsuario from "./Pages/PanelUsuario/PanelUsuario.jsx"
import ListFavorite from "./Components/ListFavorite/ListFavorite.jsx";
import ListReserva from "./Components/ListReserva/ListReserva.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const obtenerEmail = () => {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        console.log("Decoded", decoded);
        setEmail(decoded.sub);
  
        fetchEmail(decoded.sub)
          .then((data) => {
            setUser(data);
            console.log("Info de usuario", data);
            if (data) {
              fetchObtenerClienteByUsuario(Number(data.id))
                .then((clienteData) => {
                  setCliente(clienteData);
                  console.log("Cliente", clienteData);
                })
                .catch((error) => {
                  console.error(errorHandling(error));
                });
            }
          })
          .catch((error) => {
            console.error(errorHandling(error));
          });
      }
    };
  
    obtenerEmail();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<Details clienteId={cliente?.id} />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/listarProductos" element={<ListProducts />} />
          <Route path="/registrarProducto" element={<RegisterProducts />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/listarUsuarios" element={<ListarUsuarios />} />
          <Route path="/asignarCategoria" element={<AsignarCategoria />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/:id" element={<AgendaProducto />} />
        </Route>
        <Route path="/crearUsuario" element={<RegisterUser />} />
        <Route path="/listarProductos/:categoryId" element={<ProductList />} />
        <Route path="/reserva" element={<Reserva cliente={cliente} />} />
        <Route path="/cliente" element={<CrearClienteForm user={user} />} />
        <Route path="/panelUsuario" element={<PanelUsuario />} />
        <Route path="/listFavorite" element={<ListFavorite />} />
        <Route path="/listReserva" element={<ListReserva />} />



      </Routes>
    </>
  );
}

export default App;
