import React, { useState } from 'react';
import { fetchCrarUsuario } from '../../service/Api';
import registerUserStyles from "./RegisterUser.module.css";

const nombreRegex = /^[a-zA-Z]+$/;
const apellidoRegex = /^[a-zA-Z]+$/;


function RegisterUser() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errors, setErrors] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        // Validar nombre
        if (!nombre.trim()) {
            { newErrors.nombre = <span className={registerUserStyles.errorContainer}> El nombre es obligatorio</span> };
        } else if (!nombreRegex.test(nombre)) {
            {
                newErrors.nombre = <span className={registerUserStyles.errorContainer}>
                    'El nombre no puede contener caracteres especiales ni espacios'</span>
            };
        } else if (nombre.trim().length < 4) {
            { newErrors.nombre = <span className={registerUserStyles.errorContainer}> El nombre debe tener al menos 4 letras </span> };
        }

        // Validar apellido
        if (!apellido.trim()) {
            {newErrors.apellido = <span className={registerUserStyles.errorContainer}> El apellido es obligatorio</span>};
        } else if (!apellidoRegex.test(apellido)) {
            {newErrors.apellido = <span className={registerUserStyles.errorContainer}> El apellido no puede contener caracteres especiales ni espacios</span>};
        } else if (apellido.trim().length < 4) {
            {newErrors.apellido = <span className={registerUserStyles.errorContainer}> El apellido debe tener al menos 4 letras</span>};
        }

        // Validar email
        if (!email.trim()) {
            {newErrors.email = <span className={registerUserStyles.errorContainer}> El email es obligatorio </span>};
        }

        // Validar contraseña
        if (!contrasena.trim()) {
            {newErrors.contrasena = <span className={registerUserStyles.errorContainer}> 'La contraseña es obligatoria'</span>};
        } else if (contrasena.trim().length < 9) {
            {newErrors.contrasena = <span className={registerUserStyles.errorContainer}> 'La contraseña debe tener al menos 9 caracteres'</span>};
        }

        // Actualizar el estado de los errores
        setErrors(newErrors);

        // Si hay algún error, detener el envío del formulario
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const usuarioResponse = await fetchCrarUsuario({
                nombre, apellido, email, contrasena
            });
            if (!usuarioResponse.ok) {
                // Si la respuesta no es exitosa, lanzar un alert de error
                throw new Error("Error al registrar el usuario: " + usuarioResponse.status);
            }
            // Si la respuesta fue exitosa, manejarla como sea necesario
            // Por ejemplo, podrías leer el cuerpo de la respuesta en formato JSON:
            const data = await usuarioResponse.json();
            console.log("Respuesta del servidor:", data);
            alert("¡Registro exitoso!");
        } catch (error) {
            // Capturar y manejar errores que ocurran en el bloque try
            console.error("Error al registrar el usuario", error.message);
            alert("Ocurrió un error al registrar el usuario");
        }
        // Restablecer los campos del formulario
        setNombre('');
        setApellido('');
        setEmail('');
        setContrasena('');

        // Restablecer los errores
        setErrors({});
    }
    return (
        <div className={registerUserStyles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div>

                    <input
                        className={registerUserStyles.inputStyle}
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder='Nombre'
                    />
                    {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>
                <div>

                    <input
                        className={registerUserStyles.inputStyle}
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder='Apellido'
                    />
                    {errors.apellido && <span className="error">{errors.apellido}</span>}
                </div>
                <div>

                    <input
                        className={registerUserStyles.inputStyle}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>

                    <input
                        className={registerUserStyles.inputStyle}
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        placeholder='Contraseña'
                    />
                    {errors.contrasena && <span className="error">{errors.contrasena}</span>}
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default RegisterUser;