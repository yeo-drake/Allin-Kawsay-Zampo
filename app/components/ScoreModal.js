// app/components/ScoreModal.js (CÓDIGO FINAL Y CORREGIDO)
"use client"; 

import React, { useEffect, useState } from 'react'; 

export default function ScoreModal({ score, onClose }) {
    // CORRECCIÓN: Guardia de montaje para evitar errores de hidratación
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);
    
    // Si no hay partitura o no está montado, no renderiza.
    if (!score || !isMounted) return null; 

    // --- Estilos CSS ---
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, 
    };

    const modalContentStyle = {
        backgroundColor: '#F8F8F8', 
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        maxWidth: '95vw', 
        maxHeight: '95vh', 
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    };

    const closeButtonStyle = {
        position: 'sticky', 
        top: '0px', 
        right: '0px', 
        marginLeft: 'auto', 
        background: 'none',
        border: 'none',
        fontSize: '2em',
        color: '#A80036', 
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 10, 
    };

    const imageContainerStyle = {
        flex: 1, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10px 0',
    };

    const scoreImageStyle = {
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'contain',
        borderRadius: '5px',
    };

    const titleStyle = {
        fontSize: '1.8em',
        color: '#5C001F', 
        marginBottom: '5px',
        textAlign: 'center',
    };

    const rhythmStyle = {
        fontSize: '1.1em',
        color: '#A80036', 
        textAlign: 'center',
        marginBottom: '10px',
    };

    const audioContainerStyle = {
        position: 'sticky', 
        bottom: '0px', 
        backgroundColor: '#F8F8F8',
        padding: '10px 0',
        width: '100%',
        boxShadow: '0 -5px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
    };

    const audioPlayerStyle = {
        width: '100%', 
        minWidth: '280px', 
    };


    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                
                <button style={closeButtonStyle} onClick={onClose}>
                    &times;
                </button>

                <h2 style={titleStyle}>{score.title}</h2>
                <p style={rhythmStyle}>Ritmo: {score.rhythm}</p>

                <div style={imageContainerStyle}>
                    <img 
                        src={score.imageURL || 'https://via.placeholder.com/800x600.png?text=Partitura+no+disponible'} 
                        alt={`Partitura de ${score.title}`} 
                        style={scoreImageStyle} 
                    />
                </div>

                {score.guideUrl && (
                    <div style={audioContainerStyle}>
                        <audio controls src={score.guideUrl} style={audioPlayerStyle}>
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </div>
                )}
            </div>
        </div>
    );
}