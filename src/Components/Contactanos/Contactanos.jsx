import React from 'react';
import Logo from '../../assets/Logo.jpg';
import footer from '../footer/Footer.jsx';
import fondo from '../../assets/bodyback.png';

const Contactanos = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                <div className="card p-5" style={{ border: '2px solid #a257b1', backgroundImage: `url(${fondo})` }}>
                        <h2 className="text-center text-3xl font-bold mb-4">Solo Aventuras</h2>
                        <p className="text-justify text-lg font-light mb-4">
                        Solo Aventuras es una plataforma dedicada a ofrecer una amplia variedad de tours y experiencias diseñadas específicamente para personas que disfrutan viajando solas. Nuestra misión es inspirarte a explorar el mundo y descubrir destinos emocionantes, todo mientras disfrutas de la libertad y la aventura que viene con viajar en solitario. Desde emocionantes aventuras al aire libre hasta fascinantes recorridos culturales, tenemos algo para cada tipo de viajero solitario. Deja que Solo Aventuras sea tu compañero de viaje mientras te embarcas en una aventura inolvidable llena de descubrimientos y experiencias enriquecedoras.
                        </p>

                        {/* Sección de Contacto */}
                        <div className="mt-5">
                            <div className="d-flex justify-content-center mb-4">
                                <img src={Logo} alt="Logo" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                            </div>
                            <h3 className=" text-xl font-bold mb-4">Contáctanos</h3>
                            <ul className="list-unstyled">
                                <li><strong>Teléfono:</strong> +57 3023437366 </li>
                                <li><strong>Correo electrónico:</strong> soloAventuras@gmail.com</li>
                                <li><strong>Dirección:</strong> Calle Principal</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contactanos;
