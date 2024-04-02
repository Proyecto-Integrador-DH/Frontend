import "./App.css";
import { Route, Routes } from "react-router";
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
import PanelUsuario from "./Pages/PanelUsuario/PanelUsuario.jsx";
import ListFavorite from "./Components/ListFavorite/ListFavorite.jsx";
import SearchResults from "./Components/searcher/ListSearcher.jsx";
import Caracteristicas from "./Components/Caracteristicas/Caracteristicas.jsx";
import AsignarCaracteristica from "./Components/AsignarCaracteristica/AsignarCaracteristica.jsx";
import Reservas from "./Components/ListReservas/Reservas.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Ours from "./Components/Ours/Ours.jsx";
import Contact from "./Components/Contactanos/Contactanos.jsx";
import Politicas  from "./Components/Politica/Politicas.jsx";
import WhatsAppFloatingButton from "./Components/WhatsApp/WhatsApp.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerEmail = () => {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        setEmail(decoded.sub);

        fetchEmail(decoded.sub)
          .then((data) => {
            setUser(data);
            if (data) {
              fetchObtenerClienteByUsuario(Number(data.id))
                .then((clienteData) => {
                  setCliente(clienteData);
                  setLoading(false);
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

  const handleSubmit = (clienteData) => {
    setCliente(clienteData);
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <WhatsAppFloatingButton />
      <Routes>   
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/details/:id"
          element={<Details clienteId={cliente?.id} />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/listarProductos" element={<ListProducts />} />
          <Route path="/registrarProducto" element={<RegisterProducts />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/listarUsuarios" element={<ListarUsuarios />} />
          <Route path="/asignarCategoria" element={<AsignarCategoria />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/:id" element={<AgendaProducto />} />
          <Route path="/caracteristicas" element={<Caracteristicas />} />
          <Route
            path="/asignarCaracteristica"
            element={<AsignarCaracteristica />}
          />
        </Route>
        <Route path="/crearUsuario" element={<RegisterUser />} />
        <Route
          path="/listarProductos/:categoryId"
          element={<ProductList clienteId={cliente?.id} />}
        />
        <Route
          path="/reserva/"
          element={<Reserva cliente={cliente} usuario={user} />}
        />
        <Route
          path="/cliente"
          element={
            <CrearClienteForm
              cliente={cliente}
              user={user}
              onSubmit={handleSubmit}
            />
          }
        />
        <Route path="/panelUsuario" element={<PanelUsuario />} />
        <Route
          path="/listarFavoritos"
          element={<ListFavorite clienteId={cliente?.id} />}
        />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/reservas"
          element={
            user ? (
              <Reservas cliente={cliente} usuario={user} />
            ) : (
              <div>Cargando...</div>
            )
          }
        />
        <Route path="/ours" element={<Ours />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/politicas" element={<Politicas/>} />
      </Routes>
    </>
  );
}

export default App;
