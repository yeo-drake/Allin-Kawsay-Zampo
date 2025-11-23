// app/components/ScoreCard.js (CÓDIGO FINAL COMPACTADO)
"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ScoreCard({ 
    title, 
    rhythm, 
    imageUrl, 
    onClick, 
    viewMode, 
    scoreId, 
    onToggleFavorite 
}) {
    const { theme } = useTheme();
    const [isFavorite, setIsFavorite] = useState(false);

    const primaryColor = theme === 'dark' ? '#C8A952' : '#5C001F';
    const textColor = theme === 'dark' ? '#C8A952' : '#333333';
    const borderColor = theme === 'dark' ? '#C8A952' : '#A80036';
    const shadowColor = theme === 'dark' ? 'rgba(200, 169, 82, 0.3)' : 'rgba(0, 0, 0, 0.1)';

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('ciac_favorites') || '[]');
        setIsFavorite(favorites.includes(scoreId));
    }, [scoreId]);

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); 
        
        let favorites = JSON.parse(localStorage.getItem('ciac_favorites') || '[]');
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter(id => id !== scoreId);
        } else {
            newFavorites = [...favorites, scoreId];
        }

        localStorage.setItem('ciac_favorites', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);

        if (onToggleFavorite) {
            onToggleFavorite();
        }
    };


    // === Estilos ===

    // Estilos base para ambos modos
    const cardBaseStyle = {
        // 🚨 Compactación: Reducimos el padding
        padding: viewMode === 'list' ? '8px 10px' : '15px', 
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: viewMode === 'list' ? 'center' : 'stretch',
        justifyContent: 'space-between',
        position: 'relative',
        // 🚨 Compactación: Reducimos la altura mínima para list
        minHeight: viewMode === 'list' ? '40px' : '130px', 
        gap: viewMode === 'list' ? '10px' : '15px',
    };

    const cardStyle = {
        ...cardBaseStyle,
        backgroundColor: 'var(--color-card-bg)', 
        color: 'var(--color-text)', 
        border: `1px solid ${borderColor}`,
        boxShadow: `0 3px 5px ${shadowColor}`, // Sombra ligeramente más pequeña
    };

    const listStyle = {
        flexDirection: 'row',
    };

    const gridStyle = {
        flexDirection: 'column',
        textAlign: 'center',
    };

    // Estilos para la imagen
    const imageStyle = {
        // 🚨 Compactación: Reducimos el tamaño de la imagen en ambos modos
        width: viewMode === 'list' ? '40px' : '120px', 
        height: viewMode === 'list' ? '40px' : '120px',
        objectFit: 'contain', 
        borderRadius: '4px',
        marginBottom: viewMode === 'grid' ? '8px' : '0',
        border: viewMode === 'grid' ? `1px solid ${primaryColor}` : 'none',
        backgroundColor: theme === 'dark' ? '#16080C' : '#ffffff', 
    };
    
    // Estilos del contenedor de texto
    const textContainerStyle = {
        flexGrow: 1,
        textAlign: viewMode === 'list' ? 'left' : 'center',
        marginRight: '10px',
    };

    const heartStyle = {
        color: isFavorite ? primaryColor : (theme === 'dark' ? '#444' : '#ccc'),
        // 🚨 Compactación: Reducimos el tamaño del corazón
        fontSize: '1.2em', 
        cursor: 'pointer',
        transition: 'color 0.2s',
        position: viewMode === 'grid' ? 'absolute' : 'static',
        top: viewMode === 'grid' ? '8px' : 'auto',
        right: viewMode === 'grid' ? '8px' : 'auto',
    };


    return (
        <div 
            className="score-card" 
            style={{...cardStyle, ...(viewMode === 'list' ? listStyle : gridStyle)}} 
            onClick={onClick}
        >
            {/* CORAZÓN DE FAVORITO */}
            <div onClick={handleFavoriteClick} style={heartStyle}>
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </div>

            {/* IMAGEN DE LA PARTITURA */}
            {imageUrl && (
                <img 
                    src={imageUrl} 
                    alt={`Partitura de ${title}`} 
                    style={imageStyle} 
                />
            )}

            {/* TEXTO */}
            <div style={textContainerStyle}>
                <h3 style={{
                    color: primaryColor, 
                    // 🚨 Compactación: Reducimos el tamaño de la fuente
                    fontSize: viewMode === 'list' ? '1em' : '1.1em', 
                    marginBottom: '3px'
                }}>
                    {title}
                </h3>
                <p style={{
                    color: textColor, 
                    // 🚨 Compactación: Reducimos el tamaño de la fuente
                    fontSize: viewMode === 'list' ? '0.8em' : '0.9em'
                }}>
                    Ritmo: {rhythm}
                </p>
            </div>
        </div>
    );
}