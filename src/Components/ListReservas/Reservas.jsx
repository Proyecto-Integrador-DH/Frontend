import React, { useState, useEffect } from 'react';
import { fetchReservasCliente, fetchObtenerClienteByUsuario } from '../../services/api';
import FormatDate from "../../utils/FormatDate";

const Reservas = ({ usuario, cliente }) => {
    const [reservas, setReservas] = useState([]);
    const [client, setCliente] = useState(null);

    useEffect(() => {
        if (usuario) {
            fetchObtenerClienteByUsuario(Number(usuario.id))
                .then((clienteData) => {
                    setCliente(clienteData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [usuario]);

    useEffect(() => {
        if (client) {
            const id = client.id;
            fetchReservasCliente(Number(id))
                .then((data) => {
                    setReservas(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [client]);

    const getReservaState = (reserva) => {
        const fechaHoy = new Date();
        const fechaReserva = new Date(reserva.agenda.fechaIda);

        if (fechaReserva < fechaHoy) {
            return "Inactiva";
        } else {
            return reserva.estado ? "Activa" : "Cancelada";
        }
    };

    return (
        <div>
            <h2>Reservas</h2>
            <ul>
                {reservas && reservas.map((reserva) => (
                    <li key={reserva?.id}>
                        <p>Fecha: {FormatDate(reserva.agenda.fechaIda)} al {FormatDate(reserva.agenda.fechaVuelta)}</p>
                        <p>Estado: {getReservaState(reserva)}</p>
                        <p>Cantidad: {reserva.cantidad}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reservas;