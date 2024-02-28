import React, { useState } from 'react';
import { fetchCrarUsuario } from '../../service/Api';
import registerUserStyles from "./RegisterUser.module.css";

function RegisterUser() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try{
            const usuarioResponse = await fetchCrarUsuario({
               nombre, apellido, email, contrasena 
            });
            if (!usuarioResponse.ok) {
                // Lanzar un nuevo error con el mensaje de error obtenido del servidor
                throw new Error("Error al registrar el usuario: " + usuarioResponse.status);
            }

            // Si la respuesta fue exitosa, manejarla como sea necesario
            // Por ejemplo, podrías leer el cuerpo de la respuesta en formato JSON:
            const data = await usuarioResponse.json();
            console.log("Respuesta del servidor:", data);
            alert("¡Registro exitoso!");
        }catch(error){
            console.error("error al registrar el usuario", error.message);
            alert("Ocurrió un error al registrar el usuario");
        }
    }
       
return (
    <div className={registerUserStyles.formContainer}> 


    <form onSubmit={handleSubmit}>
        <div>
            <label></label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
        </div>
        <div>
            <label></label>
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
        </div>
        <div>
            <label></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        </div>
        <div>
            <label></label>
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value) } placeholder='Contraseña' />
        </div>
        <button type="submit">Registrarse</button>
    </form>
    </div>
);
}

export default RegisterUser;