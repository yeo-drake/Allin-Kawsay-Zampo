// app/components/ScoreCard.js (MODIFICADO CON VISTAS Y BOTÓN DE FAVORITOS)
"use client";

import React, { useState, useEffect } from 'react';

export default function ScoreCard({ title, rhythm, imageURL, onClick, viewMode, scoreId, onToggleFavorite }) {
    
    // Estado local para saber si esta tarjeta está marcada como favorita
    const [isFavorite, setIsFavorite] = useState(false);
    
    // Verificar el estado de Favorito al cargar (desde el Local Storage)
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('ciac_favorites') || '[]');
        setIsFavorite(favorites.includes(scoreId));
    }, [scoreId]);

    // Función para manejar el clic en el favorito
    const handleFavoriteClick = (e) => {
        // Evitar que el clic abra el modal
        e.stopPropagation(); 
        
        const favorites = JSON.parse(localStorage.getItem('ciac_favorites') || '[]');
        let newFavorites;

        if (isFavorite) {
            // Eliminar de favoritos
            newFavorites = favorites.filter(id => id !== scoreId);
        } else {
            // Añadir a favoritos
            newFavorites = [...favorites, scoreId];
        }

        localStorage.setItem('ciac_favorites', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
        
        // Notificar a la página principal para que actualice la lista de filtrado
        if (onToggleFavorite) {
            onToggleFavorite();
        }
    };
    
    // --- Lógica de Estilos Dinámicos ---
    const isMinimal = viewMode === 'minimal';
    const isList = viewMode === 'compact' || isMinimal;
    
    // 1. Estilo base de la tarjeta
    const cardStyle = {
        padding: isMinimal ? '10px 15px' : '20px',
        borderRadius: '12px',
        boxShadow: isMinimal 
            ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
            : '0 4px 15px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: isList ? 'row' : 'column', 
        alignItems: isList ? 'center' : 'stretch', 
        gap: isList ? '15px' : '0',
        borderLeft: isList ? '4px solid #FFD700' : 'none', 
        position: 'relative', // Necesario para posicionar el icono de favorito
    };

    const imageStyle = {
        width: isList ? '50px' : '100%',
        height: isList ? '50px' : '150px',
        objectFit: 'cover',
        borderRadius: isList ? '5px' : '8px',
        display: isMinimal ? 'none' : 'block', 
    };

    const textContainerStyle = {
        flexGrow: 1, 
        textAlign: isList ? 'left' : 'center',
        paddingRight: isList ? '40px' : '0', // Espacio para el icono de favorito
    };

    const titleStyle = {
        fontSize: isList ? '1.1em' : '1.3em',
        color: '#5C001F',
        margin: isMinimal ? '0' : '5px 0',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const rhythmStyle = {
        fontSize: isMinimal ? '0.9em' : '1em',
        color: '#A80036',
        margin: isMinimal ? '0' : '5px 0 0 0',
    };
    
    // Estilo del icono de favorito
    const favoriteIconStyle = {
        position: isList ? 'absolute' : 'relative',
        top: isList ? '50%' : 'auto',
        right: isList ? '15px' : '0',
        transform: isList ? 'translateY(-50%)' : 'none',
        fontSize: isList ? '24px' : '28px',
        color: isFavorite ? '#FFD700' : '#ccc', // Dorado si es favorito
        cursor: 'pointer',
        marginLeft: isList ? '0' : '10px',
        alignSelf: isList ? 'auto' : 'flex-end',
        transition: 'color 0.2s',
        lineHeight: 1, 
    };


    return (
        <div 
            style={cardStyle} 
            onClick={onClick}
            onMouseEnter={e => e.currentTarget.style.transform = isMinimal ? 'scale(1.01)' : 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            {/* Contenido de la tarjeta */}
            {!isMinimal && (
                <img 
                    src={imageURL || '/placeholder-min.png'}
                    alt={`Partitura de ${title}`} 
                    style={imageStyle}
                />
            )}
            
            <div style={textContainerStyle}>
                <div style={titleStyle}>{title}</div>
                {!isMinimal && <div style={rhythmStyle}>{rhythm}</div>}
            </div>
            
            {/* ICONO DE FAVORITO */}
            <span 
                style={favoriteIconStyle} 
                onClick={handleFavoriteClick}
                title={isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
            >
                {isFavorite ? '★' : '☆'}
            </span>

        </div>
    );
}