// app/components/Navbar.js (COLORES DEL NAVBAR CORREGIDOS)
"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../AuthContext'; 
import { useTheme } from '../ThemeContext'; 

const GRANATE_OSCURO = '#5C001F';
const DORADO_SUAVE = '#C8A952'; 

// Estilos compartidos para los íconos
const iconStyle = {
    width: '24px',
    height: '24px',
    display: 'block',
    stroke: 'currentColor', 
    fill: 'none',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

// Componente Navbar
export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // Color de Fondo de la Barra: 
    // MODO CLARO: GRANATE OSCURO (#5C001F)
    // MODO OSCURO: Un Granate muy muy oscuro/negro (#1B0008)
    const navbarBgColor = theme === 'dark' ? '#1B0008' : GRANATE_OSCURO;
    
    // Color del Texto en la Barra: 
    // MODO CLARO: BLANCO (para contrastar con el fondo granate)
    // MODO OSCURO: DORADO SUAVE
    const navbarTextColor = theme === 'dark' ? DORADO_SUAVE : 'white';


    const navbarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        backgroundColor: navbarBgColor, 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        zIndex: 9990,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        // Mantenemos el borde dorado en ambos modos para identidad
        borderBottom: `2px solid ${DORADO_SUAVE}`, 
    };

    const linkStyle = {
        color: navbarTextColor, // Usamos el color de texto de la barra
        textDecoration: 'none',
        fontWeight: 'bold',
        margin: '0 15px',
        transition: 'color 0.3s',
    };
    
    // Estilo para el botón de logout y el toggle
    const buttonBaseStyle = {
        padding: '8px 15px',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        fontWeight: 'bold',
        border: 'none',
    };
    
    // El botón de logout ahora usará los colores invertidos para seguir el contraste
    const logoutButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: navbarTextColor, // Blanco o Dorado
        color: navbarBgColor, // Granate Oscuro o Negro Granate
        marginLeft: '15px',
    };
    
    const themeToggleStyle = {
        ...buttonBaseStyle,
        color: navbarTextColor, // El ícono es del mismo color que el texto del Navbar
        backgroundColor: 'transparent',
        padding: '8px', 
        fontSize: '1.2rem',
    };


    if (!isAuthenticated) {
        return <div style={navbarStyle}></div>; 
    }

    return (
        <nav style={navbarStyle}>
            {/* Contenedor de Links */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/" style={linkStyle}>
                    Inicio
                </Link>
                <Link href="/repertorio" style={linkStyle}>
                    Repertorio
                </Link>
                <Link href="/galeria" style={linkStyle}>
                    Galería
                </Link>
                <Link href="/eventos" style={linkStyle}>
                    Eventos
                </Link>
            </div>

            {/* Controles: Tema y Logout */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                
                {/* Botón de Toggle de Tema (SVG insertado directamente) */}
                <button 
                    onClick={toggleTheme} 
                    style={themeToggleStyle}
                    aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
                >
                    {theme === 'dark' ? (
                        // Icono del Sol (para sugerir cambio a modo claro)
                        <svg style={iconStyle} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    ) : (
                        // Icono de la Luna (para sugerir cambio a modo oscuro)
                        <svg style={iconStyle} viewBox="0 0 24 24">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    )}
                </button>

                <button 
                    onClick={logout} 
                    style={logoutButtonStyle}
                >
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}