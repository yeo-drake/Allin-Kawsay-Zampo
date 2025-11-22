// app/components/ScoreModal.js (CÓDIGO FINAL LIMPIO)
"use client"; 

import React, { useEffect, useState } from 'react'; 

export default function ScoreModal({ score, onClose }) {
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
    
    if (!score || !isMounted) return null; 

    // ... (Estilos CSS omitidos por simplicidad, son los mismos que antes) ...

    // Estilos CSS resumidos
    const debugStyle = {
        backgroundColor: '#FFEBEE', border: '2px solid #D32F2F', 
        color: '#C62828', padding: '10px', marginBottom: '15px', 
        borderRadius: '5px', fontSize: '0.9em', wordBreak: 'break-all', textAlign: 'left',
    }
    const successDebugStyle = {
        ...debugStyle, borderColor: '#4CAF50', color: '#2E7D32', backgroundColor: '#E8F5E9'
    }

    const modalOverlayStyle = { /* ... */ };
    const modalContentStyle = { /* ... */ };
    const closeButtonStyle = { /* ... */ };
    const imageContainerStyle = { /* ... */ };
    const scoreImageStyle = { /* ... */ };
    const titleStyle = { /* ... */ };
    const rhythmStyle = { /* ... */ };
    const audioContainerStyle = { /* ... */ };
    const audioPlayerStyle = { /* ... */ };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                
                <button style={closeButtonStyle} onClick={onClose}>
                    &times;
                </button>

                <h2 style={titleStyle}>{score.title}</h2>
                <p style={rhythmStyle}>Ritmo: {score.rhythm}</p>

                {/* CUADRO DE DEPURACIÓN VISIBLE */}
                {score.imageUrl ? ( // <-- ¡Verifica que el nombre coincida con Firestore!
                    <div style={successDebugStyle}>
                        **DEBUG ÉXITO:** URL de la Partitura: {score.imageUrl}
                    </div>
                ) : (
                    <div style={debugStyle}>
                        **DEBUG ERROR:** El campo **`imageUrl`** en Firestore está **VACÍO o NULO**.
                    </div>
                )}
                
                <div style={imageContainerStyle}>
                    <img 
                        src={score.imageUrl || 'https://via.placeholder.com/800x600.png?text=Partitura+no+disponible'} // <-- ¡Verifica que el nombre coincida con Firestore!
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