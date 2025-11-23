// app/components/GalleryModal.js
"use client";

import React from 'react';

export default function GalleryModal({ item, onClose }) {
    if (!item) return null;

    const { title, url, type } = item;
    
    // Estilos del modal (inspirados en ScoreModal)
    const overlayStyle = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    };

    const contentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        maxWidth: '90%',
        maxHeight: '90%',
        display: 'flex',
        flexDirection: 'column',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
        marginBottom: '10px',
    };

    const closeButtonStyle = {
        background: 'none',
        border: 'none',
        fontSize: '1.5em',
        cursor: 'pointer',
        color: '#5C001F',
        fontWeight: 'bold',
    };
    
    const mediaContainerStyle = {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    };

    const mediaStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
    };

    // Lógica para determinar si es un video de YouTube
    const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
    
    const renderMedia = () => {
        if (type === 'image') {
            return (
                <img 
                    src={url} 
                    alt={title} 
                    style={mediaStyle} 
                />
            );
        }

        if (type === 'video' && isYoutube) {
            const videoIdMatch = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
            const videoId = videoIdMatch ? videoIdMatch[1] : '';

            if (videoId) {
                // Usamos un div con dimensiones fijas dentro del modal para el iframe
                return (
                    <div style={{ width: '80vw', height: '80vh', maxWidth: '800px', maxHeight: '600px' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={title}
                        ></iframe>
                    </div>
                );
            }
        }

        return <p>Contenido no visualizable directamente en el modal.</p>;
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
                
                <div style={headerStyle}>
                    <h2>{type === 'image' ? '🖼️ Imagen' : '▶️ Video'}: {title}</h2>
                    <button style={closeButtonStyle} onClick={onClose}>
                        &times;
                    </button>
                </div>
                
                <div style={mediaContainerStyle}>
                    {renderMedia()}
                </div>

                {type === 'image' && (
                    <div style={{ marginTop: '15px', textAlign: 'right' }}>
                        <a 
                            href={url} 
                            download={`${title}.jpg`} 
                            style={{ 
                                padding: '8px 15px', 
                                backgroundColor: '#FFD700', 
                                color: '#5C001F', 
                                textDecoration: 'none', 
                                borderRadius: '5px', 
                                fontWeight: 'bold' 
                            }}
                        >
                            ⬇️ Descargar Imagen
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}