import React from "react";

const Politicas = () => {
  return (
    <div className="modal-overlay">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold underline mb-4">
          Políticas de términos y condiciones
        </h2>
        <h3>
          Al reservar su experiencia deseada, usted acepta los siguientes
          términos y condiciones:
        </h3>
        <div className="w-full bg-gradient-to-r from-purple-200 to-pink-300  rounded-lg">
        <h2 className="text-2xl font-bold underline pt-6">
          Términos y condiciones
        </h2>
          <div className="grid grid-cols-3 gap-4 p-10">
            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Celebración del contrato</h3>
              <p className="text-sm">
                Con el registro de viaje hecho exclusivamente a través de correo
                electrónico, el cliente da una oferta para celebrar un contrato
                de viaje con SoloAventuras. El contrato de viaje se celebra con
                la confirmación electrónica de la reserva por parte de
                SoloAventuras al cliente.
              </p>
            </div>
            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Obligación de SoloAventuras</h3>
              <p className="text-sm">
                La obligación de SoloAventuras resulta exclusivamente del
                contenido de la confirmación de la reserva junto con la
                descripción del viaje e información y explicaciones
                relacionadas. Los demás acuerdos que amplían el alcance de los
                servicios contractuales, sólo son válidos, si han sido
                confirmados por escrito por SoloAventuras.
              </p>
            </div>

            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Obligaciones del Cliente</h3>
              <p className="text-sm">
                El cliente está obligado a informar inmediatamente al guía
                turístico/ coordinador encargado por SoloAventuras acerca de
                cualquier problema/ falla con respecto al tour y solicitar una
                reparación. Reclamaciones de los clientes sólo son válidas, si
                el cliente cumple con la obligación de notificación de los
                problemas/ fallas.
              </p>
            </div>

            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Reglamento</h3>
              <p className="text-sm">
                El viajero es responsable de cumplir con todas las regulaciones
                necesarias para proceder al viaje. SoloAventuras no es
                responsable de la emisión y recepción oportuna de los visados
                necesarios de la respectiva representación diplomática. Todos
                los gastos y perjuicios ocasionados por el incumplimiento de
                estas disposiciones por parte del participante del viaje, van a
                su cuenta.
              </p>
            </div>

            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Seguros</h3>
              <p className="text-sm">
                Desde el inicio hasta la finalización del periodo del viaje en
                que SoloAventuras está contratado como operador turistico, el
                turista tendrá un seguro viajero de Mundoasistencia. Para
                los turistas nacionales aplica el seguro “visitor”, para el
                turista extranjero el seguro “total”. Para actividades con mayor
                riesgo aplica el seguro “extremo” para el turista nacional y el
                “visitor extremo” para el turista extranjero.
              </p>
            </div>

            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Características Especiales</h3>
              <p className="text-sm">
                Pueden ocurrir retrasos de transporte de los destinos
                correspondientes, tales como autobús o avión. Los eventos
                locales, como los mercados o festivales se cancelan a menudo con
                poca antelación y sin dar razones. Dado que las variaciones
                climáticas son posibles en cualquier momento, no se acepta
                responsabilidad en este sentido.
                Vacunas: Le sugerimos obtener recomendaciones de vacunación de
                un médico especialista antes de la salida.
              </p>
            </div>

            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Validez de la información</h3>
              <p className="text-sm">
                La información proporcionada en nuestro portafolio es sólo
                informativa y pretenden ser propuestas de viaje. Por lo tanto,
                los cambios son posibles y quedan reservados. Sólo el contenido
                de la confirmación de la reserva es autoritaria. Los errores en
                la oferta o descripción de servicios quedan reservados.
              </p>
            </div>

            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Cancelación del contrato</h3>
              <p className="text-sm">
                SoloAventuras puede cancelar el contrato, (1) en caso de eventos
                externos inesperados fortuitos o (2) si las condiciones de pago
                no se han cumplido por parte del cliente. El cliente puede
                cancelar el contrato en cualquier momento antes de la salida del
                viaje mediante notificación a SoloAventuras En cualquier caso de
                cancelación por parte del cliente, SoloAventuras tiene el
                derecho de aplicar gastos de cancelación. 
              </p>
            </div>

            <div className="place-items-center">
              <h3 className="font-semibold text-center w-full pb-1.5">Otros</h3>
              <p className="text-sm">
                Si una de las anteriores disposiciones sea o resulta inválida,
                las regulaciones restantes, sin embargo, siguen siendo válidas y
                la eficacia del contrato de viaje no se ve afectada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politicas;
