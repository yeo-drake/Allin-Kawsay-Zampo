// app/components/ScoreModal.js (CÓDIGO FINAL SIN MARCA DE AGUA)
"use client";

import React from 'react';
import { useTheme } from '../ThemeContext';

export default function ScoreModal({ score, onClose }) {
    // Nota: Se asume que ThemeContext y useTheme están definidos.
    // Si aún no has creado ThemeContext, esto podría dar un error,
    // pero mantenemos la referencia para el Modo Oscuro.
    const { theme } = { theme: 'light' }; // Valor por defecto si ThemeContext no está listo. 
    // const { theme } = useTheme(); // Descomentar esta línea cuando ThemeContext esté listo.

    if (!score) return null;

    // --- Definición de Colores ---
    const GRANATE_OSCURO = '#5C001F';
    const DORADO_SUAVE = '#C8A952';
    
    // Colores basados en el tema (usando 'light' por ahora)
    const modalBgColor = theme === 'dark' ? '#231017' : 'white'; 
    const textColor = theme === 'dark' ? DORADO_SUAVE : '#333333';
    const titleColor = theme === 'dark' ? '#FFFFFF' : GRANATE_OSCURO; 
    const closeButtonBg = theme === 'dark' ? DORADO_SUAVE : GRANATE_OSCURO;
    const closeButtonColor = theme === 'dark' ? GRANATE_OSCURO : 'white';


    // --- Lógica para determinar el tipo de reproductor ---
    const getEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`;
        }
        return null; 
    };
    
    const youtubeEmbedUrl = getEmbedUrl(score.guideUrl);
    const isDirectAudio = score.guideUrl && !youtubeEmbedUrl;


    // 🚨 DEFINICIÓN DE ESTILOS (TODOS NECESARIOS) 🚨
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const modalStyle = {
        backgroundColor: modalBgColor,
        color: textColor,
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '90%',
        maxHeight: '90%',
        overflowY: 'auto',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        minWidth: '320px',
        border: `2px solid ${DORADO_SUAVE}`,
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontWeight: 'bold',
        backgroundColor: closeButtonBg,
        color: closeButtonColor,
        fontSize: '1.2em',
    };

    const titleStyle = {
        color: titleColor,
        borderBottom: `2px solid ${DORADO_SUAVE}`,
        paddingBottom: '10px',
        marginBottom: '20px',
    };

    const imageContainerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        border: `1px solid ${theme === 'dark' ? DORADO_SUAVE : '#ccc'}`,
        padding: '5px',
        borderRadius: '8px',
        backgroundColor: theme === 'dark' ? '#16080C' : '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '150px', 
        position: 'relative', // Mantenemos relative
    };
    
    const imageStyle = {
        maxWidth: '100%', 
        height: 'auto', 
        maxHeight: '400px', 
        borderRadius: '6px',
        objectFit: 'contain',
        backgroundColor: 'transparent',
        zIndex: 0,
    };
    
    const audioContainerStyle = {
        marginTop: '20px',
        width: '100%',
        backgroundColor: 'transparent',
    };

    const audioPlayerStyle = {
        width: '100%',
        backgroundColor: theme === 'dark' ? DORADO_SUAVE : GRANATE_OSCURO, 
        borderRadius: '8px',
        padding: '5px',
    }
    // -------------------------------------------------------------


    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <button style={closeButtonStyle} onClick={onClose}>
                    X
                </button>

                <h2 style={titleStyle}>{score.title}</h2>
                
                {/* 1. Muestra la imagen de la partitura */}
                {score.imageUrl && (
                    <div style={imageContainerStyle}>
                        
                        {/* 🚨 BLOQUE DE MARCA DE AGUA ELIMINADO 🚨 */}

                        <img 
                            src={score.imageUrl} 
                            alt={`Imagen de ${score.title}`} 
                            style={imageStyle}
                            onError={(e) => { 
                                e.target.style.display = 'none'; 
                                console.error(`Error al cargar la imagen: ${score.imageUrl}`);
                            }}
                        />
                    </div>
                )}
                
                {/* 2. Muestra solo el Ritmo */}
                <p style={{marginTop: '15px'}}>
                    <strong>Ritmo:</strong> {score.rhythm}
                </p>
                
                {/* 3. REPRODUCTOR DE AUDIO NATIVO O YOUTUBE */}
                {(isDirectAudio || youtubeEmbedUrl) && (
                    <div style={audioContainerStyle}>
                        <h3 style={{color: titleColor, marginBottom: '10px'}}>🎧 Guía de Audio</h3>
                        
                        {isDirectAudio ? (
                            <audio controls style={audioPlayerStyle}>
                                <source src={score.guideUrl} type="audio/mpeg" />
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        ) : (
                            <iframe
                                width="100%"
                                height="200" 
                                src={youtubeEmbedUrl} 
                                title={`Guía de Audio para ${score.title}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ 
                                    border: 'none', 
                                    borderRadius: '8px',
                                    backgroundColor: 'transparent'
                                }}
                            ></iframe>
                        )}
                        
                    </div>
                )}
                
            </div>
        </div>
    );
}