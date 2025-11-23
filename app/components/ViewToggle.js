// app/components/ViewToggle.js
"use client";
import React from 'react';

// Estilos de iconos simples (puedes usar librerías como react-icons si las instalas)
const iconStyle = {
    cursor: 'pointer',
    fontSize: '24px',
    margin: '0 5px',
    transition: 'color 0.2s',
};

export default function ViewToggle({ viewMode, setViewMode }) {
    
    // Función para obtener el estilo del icono, resaltando el modo activo
    const getIconStyle = (mode) => ({
        ...iconStyle,
        color: viewMode === mode ? '#A80036' : '#999', // Rojo Rubí si está activo
        fontWeight: viewMode === mode ? 'bold' : 'normal',
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
            <span 
                style={getIconStyle('grid')}
                onClick={() => setViewMode('grid')}
                title="Vista de Cuadrícula (Grande)"
            >
                {/* Ícono de 4 cuadrados */}
                &#9638;
            </span>
            <span 
                style={getIconStyle('compact')}
                onClick={() => setViewMode('compact')}
                title="Vista de Lista Compacta"
            >
                {/* Ícono de lista con imagen pequeña */}
                &#9776;
            </span>
            <span 
                style={getIconStyle('minimal')}
                onClick={() => setViewMode('minimal')}
                title="Lista Minimalista (Solo Texto)"
            >
                {/* Ícono de solo líneas */}
                &#9779;
            </span>
        </div>
    );
}