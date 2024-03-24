import React, { useState, useEffect } from 'react'
import { fetchReservasCliente } from '../../services/api'
import FormatDate from "../../utils/FormatDate";

const Reservas = (clienteId) => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        fetchReservasCliente(clienteId)
        .then((data) => {
            console.log("Reservas", data);
            setReservas(data)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [clienteId])


  return (
    <div>
        <h2>Reservas</h2>
        <ul>
            {reservas.map((reserva) => (
            <li key={reserva.id}>
                <p>Fecha: {FormatDate(reserva.agenda.fechaIda)} al {FormatDate(reserva.agenda.fechaVuelta)}</p>
                <p>Estado: {reserva.estado ? "Activa" : "Cancelada"}</p>
                <p>Cantidad: {reserva.cantidad}</p>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Reservas