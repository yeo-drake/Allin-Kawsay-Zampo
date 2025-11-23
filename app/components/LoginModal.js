// app/components/LoginModal.js (CÓDIGO FINAL CON ESTILOS ELEGANTES)
"use client";

import { useState } from 'react';
import { useAuth } from '../AuthContext'; 

// Definición de colores elegantes
const GRANATE_OSCURO = '#5C001F';
const DORADO_SUAVE = '#C8A952'; 
const TEXTO_OSCURO = '#1A1A1A';

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

    // --- Estilos Actualizados para la Elegancia ---
    const overlayStyle = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        // Fondo con gradiente sutil de los colores primarios
        background: `linear-gradient(135deg, ${GRANATE_OSCURO} 0%, #A80036 100%)`, 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        textAlign: 'center',
        fontFamily: 'Times New Roman, serif', // Usamos la fuente formal
        padding: '20px',
    };

    const containerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Casi blanco para limpiar el aspecto
        borderRadius: '10px', // Bordes más suaves
        padding: '30px 40px',
        // Sombra sutil y elegante
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)', 
        maxWidth: '450px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // Eliminamos el 'backdrop-filter: blur' para un aspecto más limpio
        border: '1px solid rgba(0, 0, 0, 0.1)',
    };

    const logoStyle = {
        width: '80px', // Un poco más pequeño y enfocado
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '15px',
        // Borde dorado suave
        border: `3px solid ${DORADO_SUAVE}`,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    };

    const titleStyle = {
        fontSize: '2.2em', // Tamaño ajustado
        marginBottom: '5px',
        color: GRANATE_OSCURO, // Título en color primario
        letterSpacing: '0.5px',
        fontWeight: 'bold',
    };

    const subtitleStyle = {
        fontSize: '1em',
        marginBottom: '30px',
        color: TEXTO_OSCURO, // Subtítulo en texto oscuro
        lineHeight: '1.4',
    };

    const inputStyle = {
        padding: '12px 15px',
        margin: '15px 0',
        borderRadius: '5px', // Bordes más definidos
        
        borderWidth: '1px', 
        borderStyle: 'solid', 
        borderColor: '#ccc', // Borde gris claro por defecto
        
        backgroundColor: 'white',
        color: TEXTO_OSCURO,
        width: '100%',
        fontSize: '1em',
        outline: 'none',
        textAlign: 'center',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    };

    const inputFocusStyle = {
        borderColor: DORADO_SUAVE, 
        // Sombra suave del color de acento
        boxShadow: `0 0 8px rgba(200, 169, 82, 0.6)`, 
    };

    const buttonStyle = {
        padding: '12px 25px',
        backgroundColor: DORADO_SUAVE, // Botón en Dorado Suave
        color: GRANATE_OSCURO,
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.1em',
        marginTop: '20px',
        transition: 'background-color 0.3s, transform 0.2s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#D4B969', // Un tono ligeramente más claro al pasar el ratón
        transform: 'translateY(-1px)',
    };

    const errorStyle = {
        color: 'white',
        backgroundColor: '#A80036',
        padding: '8px 15px',
        borderRadius: '5px',
        fontWeight: 'normal',
        marginTop: '15px',
        fontSize: '0.9em',
        border: '1px solid #FFEBEE',
    };

    const [isInputFocused, setInputFocused] = useState(false);
    const [isButtonHovered, setButtonHovered] = useState(false);

    return (
        <div style={overlayStyle}>
            <div style={containerStyle}>
                <img src="/logo.png" alt="Logo del Grupo CIAC" style={logoStyle} /> 
                <h1 style={titleStyle}>Acceso de Miembros</h1>
                <p style={subtitleStyle}>
                    Por favor, introduce la contraseña de acceso proporcionada por el **C.I.A.C. Allin Kawsay Juliaca**.
                </p>
                
                <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input
                        type="password"
                        placeholder="Contraseña Secreta"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        Acceder al Portal
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