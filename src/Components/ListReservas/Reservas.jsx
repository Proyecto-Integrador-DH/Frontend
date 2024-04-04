import React, { useState, useEffect } from "react";
import {
  fetchReservasCliente,
  fetchObtenerClienteByUsuario,
} from "../../services/api";
import FormatDate from "../../utils/FormatDate";
import Loading from "../Loading/Loading";
import { set } from "date-fns";

const Reservas = ({ usuario }) => {
  const [reservas, setReservas] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuario) {
      fetchObtenerClienteByUsuario(Number(usuario.id))
        .then((clienteData) => {
          setLoading(true);
          setCliente(clienteData);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [usuario]);

  useEffect(() => {
    if (cliente) {
      const id = cliente.id;
      fetchReservasCliente(Number(id))
        .then((data) => {
          setLoading(true);
          data.sort(
            (a, b) => new Date(a.agenda.fechaIda) - new Date(b.agenda.fechaIda)
          );
          setReservas(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cliente]);

  const getReservaState = (reserva) => {
    const fechaHoy = new Date();
    const fechaReserva = new Date(reserva.agenda.fechaIda);

    if (fechaReserva < fechaHoy) {
      return "Inactiva";
    } else {
      return reserva.estado ? "Activa" : "Cancelada";
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-4">Reservas</h2>
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div
            key={reserva.id}
            className="container d-flex justify-content-center align-items-center"
          >
            <div
              className={`card mb-3 ${
                getReservaState(reserva) === "Inactiva" ? "bg-gray-200" : ""
              }`}
              style={{ width: "80%", margin: "auto" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  {reserva.agenda.producto.imagenes?.[0] && (
                    <img
                      src={reserva.agenda.producto.imagenes[0].url}
                      className="object-cover h-48 w-full rounded-start"
                      alt={reserva.agenda.producto.nombre}
                      style={{
                        maxHeight: "150px",
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="text-3x2 font-bold mb-4">
                      {reserva.agenda.producto.nombre}
                    </h5>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="card-text">
                          Fecha de Ida: {FormatDate(reserva.agenda.fechaIda)}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="card-text">
                          Fecha de Regreso:{" "}
                          {FormatDate(reserva.agenda.fechaVuelta)}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="card-text">
                          Estado: {getReservaState(reserva)}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="card-text">
                          Cantidad: {reserva.cantidad}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay reservas</p>
      )}
    </div>
  );
};

export default Reservas;
