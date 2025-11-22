// app/components/LoginModal.js (NUEVO COMPONENTE)
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
            setPassword(''); // Limpia la contraseña incorrecta
        }
    };

    // --- Estilos para el Bloqueo ---
    const overlayStyle = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#5C001F', // Granate
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        textAlign: 'center',
    };

    const inputStyle = {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #FFD700', // Dorado
        width: '80%',
        maxWidth: '300px',
        fontSize: '1.1em',
        outline: 'none',
        textAlign: 'center',
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#FFD700', // Dorado
        color: '#5C001F',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px',
    };

    return (
        <div style={overlayStyle}>
            <h1>Acceso Restringido</h1>
            <p style={{marginBottom: '20px'}}>
                Por favor, introduce la contraseña de acceso proporcionada por el C.I.A.C.
            </p>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Contraseña Secreta"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={buttonStyle}>
                    Acceder
                </button>
            </form>

            {error && (
                <p style={{ color: '#A80036', fontWeight: 'bold', marginTop: '15px', backgroundColor: 'white', padding: '5px', borderRadius: '3px'}}>
                    Contraseña incorrecta. Intenta de nuevo.
                </p>
            )}
        </div>
    );
}
