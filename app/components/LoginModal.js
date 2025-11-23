// app/components/LoginModal.js (CÓDIGO FINAL Y CORREGIDO)
"use client";

import { useState } from 'react';
import { useAuth } from '../AuthContext'; 

export default function LoginModal() {
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        const success = login(password);
        
        if (!success) {
            setError(true);
            setPassword(''); 
        }
    };

    // --- Estilos para el Bloqueo ---
    const overlayStyle = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        // Fondo degradado con tus colores
        background: 'linear-gradient(135deg, #5C001F 0%, #A80036 100%)', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        textAlign: 'center',
        fontFamily: 'Georgia, serif', // Usar la misma fuente
        padding: '20px', // Añadir padding general
    };

    const containerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semi-transparente
        borderRadius: '15px',
        padding: '30px 40px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        maxWidth: '450px', // Limitar el ancho
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backdropFilter: 'blur(5px)', // Efecto de cristal esmerilado
        border: '1px solid rgba(255, 255, 255, 0.2)', // Borde sutil
    };

    const logoStyle = {
        width: '100px', // Tamaño del logo
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '20px',
        border: '3px solid #FFD700', // Borde Dorado
        boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)', // Brillo Dorado
    };

    const titleStyle = {
        fontSize: '2.5em', // Tamaño del título
        marginBottom: '10px',
        color: '#FFD700', // Dorado
        letterSpacing: '1px',
    };

    const subtitleStyle = {
        fontSize: '1.1em',
        marginBottom: '30px',
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: '1.5',
    };

    // SOLUCIÓN AL ERROR: Usar propiedades de borde individuales (non-shorthand)
    const inputStyle = {
        padding: '12px 15px',
        margin: '15px 0',
        borderRadius: '8px',
        
        // Propiedades de borde individuales para evitar conflictos
        borderWidth: '2px', 
        borderStyle: 'solid', 
        borderColor: '#FFD700', // Color base del borde
        
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fondo claro para el texto
        color: '#5C001F', // Texto Granate
        width: '100%', // Ancho completo del contenedor
        fontSize: '1.1em',
        outline: 'none',
        textAlign: 'center',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    };

    const inputFocusStyle = {
        // Solo cambiamos el color y la sombra, sin conflictos
        borderColor: '#FFC107', // Dorado más brillante al enfocar
        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
    };

    const buttonStyle = {
        padding: '12px 25px',
        backgroundColor: '#FFD700', // Dorado
        color: '#5C001F', // Granate
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.2em',
        marginTop: '20px',
        transition: 'background-color 0.3s, transform 0.2s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#FFC107', // Dorado más oscuro al pasar el ratón
        transform: 'translateY(-2px)',
    };

    const errorStyle = {
        color: '#FFEBEE', // Rojo muy claro
        backgroundColor: '#A80036', // Rojo Rubí para el fondo del error
        padding: '8px 15px',
        borderRadius: '5px',
        fontWeight: 'bold',
        marginTop: '15px',
        fontSize: '0.95em',
    };

    const [isInputFocused, setInputFocused] = useState(false);
    const [isButtonHovered, setButtonHovered] = useState(false);

    return (
        <div style={overlayStyle}>
            <div style={containerStyle}>
                <img src="/logo.png" alt="Logo del Grupo CIAC" style={logoStyle} /> 
                <h1 style={titleStyle}>Acceso Restringido</h1>
                <p style={subtitleStyle}>
                    Por favor, introduce la contraseña de acceso proporcionada por el **C.I.A.C. Allin Kawsay Juliaca**.
                </p>
                
                <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input
                        type="password"
                        placeholder="Contraseña Secreta"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // Aplicar el estilo condicional corregido
                        style={isInputFocused ? {...inputStyle, ...inputFocusStyle} : inputStyle}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        required
                    />
                    <button 
                        type="submit" 
                        style={isButtonHovered ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
                        onMouseEnter={() => setButtonHovered(true)}
                        onMouseLeave={() => setButtonHovered(false)}
                    >
                        Acceder
                    </button>
                </form>

                {error && (
                    <p style={errorStyle}>
                        Contraseña incorrecta. Intenta de nuevo.
                    </p>
                )}
            </div>
        </div>
    );
}