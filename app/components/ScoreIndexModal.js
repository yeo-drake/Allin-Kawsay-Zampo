// app/components/ScoreIndexModal.js (CÓDIGO FINAL CON HOOKS EN ORDEN CORREGIDO)
"use client";

import React, { useState, useMemo } from 'react';
import { useTheme } from '../ThemeContext';

export default function ScoreIndexModal({ isOpen, onClose, scores, openScoreModal }) {
    const { theme } = useTheme();

    // 1. 🚨 HOOKS DEBEN IR PRIMERO 🚨
    const [filterIndexRhythm, setFilterIndexRhythm] = useState('all');

    // Colores (Pueden ir aquí o después)
    const GRANATE_OSCURO = '#5C001F';
    const DORADO_SUAVE = '#C8A952';
    const modalBgColor = theme === 'dark' ? '#231017' : 'white'; 
    const titleColor = theme === 'dark' ? '#FFFFFF' : GRANATE_OSCURO;
    const textColor = theme === 'dark' ? DORADO_SUAVE : '#333333';
    const closeButtonBg = theme === 'dark' ? DORADO_SUAVE : GRANATE_OSCURO;
    const closeButtonColor = theme === 'dark' ? GRANATE_OSCURO : 'white';

    // 2. 🚨 Lógica para obtener ritmos únicos (useMemo) 🚨
    const uniqueRhythms = useMemo(() => {
        const rhythms = scores.map(score => score.rhythm).filter(Boolean); 
        const unique = [...new Set(rhythms)];
        return unique.sort((a, b) => a.localeCompare(b));
    }, [scores]);

    // 3. Lógica para filtrar y agrupar las partituras (useMemo)
    const filteredAndGroupedScores = useMemo(() => {
        let currentScores = scores;
        
        if (filterIndexRhythm !== 'all') {
            currentScores = currentScores.filter(score => 
                score.rhythm.toLowerCase() === filterIndexRhythm.toLowerCase()
            );
        }

        const groupedScores = currentScores.reduce((acc, score) => {
            const firstLetter = score.title ? score.title[0].toUpperCase() : '#';
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(score);
            return acc;
        }, {});
        
        return {
            groupedScores,
            sortedKeys: Object.keys(groupedScores).sort()
        };
    }, [scores, filterIndexRhythm]);

    const { groupedScores, sortedKeys } = filteredAndGroupedScores;

    // 4. 🚨 LA SALIDA CONDICIONAL DEBE IR DESPUÉS DE TODOS LOS HOOKS 🚨
    if (!isOpen) return null; 

    // Estilos del Modal (se mantienen los estilos, sin cambios en la lógica)
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10001,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const modalStyle = {
        backgroundColor: modalBgColor,
        color: textColor,
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '600px', 
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

    const listItemStyle = {
        padding: '8px 0',
        cursor: 'pointer',
        borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#eee'}`,
        transition: 'background-color 0.2s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const selectStyle = {
        padding: '8px 10px',
        borderRadius: '6px',
        border: `1px solid ${DORADO_SUAVE}`,
        backgroundColor: theme === 'dark' ? '#16080C' : '#f9f9f9',
        color: textColor,
        fontSize: '0.9em',
        cursor: 'pointer',
        marginBottom: '15px',
        width: '100%',
    };
    
    // Función que maneja el clic en la canción del índice
    const handleSongClick = (song) => {
        onClose(); 
        openScoreModal(song);
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <button style={closeButtonStyle} onClick={onClose}>
                    X
                </button>

                <h2 style={{ color: titleColor, borderBottom: `2px solid ${DORADO_SUAVE}`, paddingBottom: '10px', marginBottom: '15px' }}>
                    📖 Índice General de Partituras ({scores.length})
                </h2>
                
                {/* FILTRO POR RITMO DENTRO DEL ÍNDICE */}
                <select 
                    value={filterIndexRhythm} 
                    onChange={(e) => setFilterIndexRhythm(e.target.value)} 
                    style={selectStyle}
                >
                    <option value="all">Filtrar por Ritmo: Todos</option>
                    {uniqueRhythms.map(rhythm => (
                        <option key={rhythm} value={rhythm.toLowerCase()}>{rhythm}</option>
                    ))}
                </select>

                <p style={{marginBottom: '20px', color: textColor}}>
                    Mostrando {Object.values(groupedScores).flat().length} resultado(s) en el índice. Haz clic en el título para abrir la partitura.
                </p>

                {sortedKeys.map(letter => (
                    <div key={letter} style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: DORADO_SUAVE, borderBottom: `1px solid ${DORADO_SUAVE}`, paddingBottom: '5px' }}>
                            {letter}
                        </h3>
                        {groupedScores[letter].map((song) => (
                            <div 
                                key={song.id} 
                                style={listItemStyle}
                                onClick={() => handleSongClick(song)}
                            >
                                <span style={{ color: textColor, fontWeight: '500' }}>
                                    {song.title}
                                </span>
                                <span style={{ 
                                    color: theme === 'dark' ? DORADO_SUAVE : GRANATE_OSCURO, 
                                    fontSize: '0.8em', 
                                    fontWeight: 'bold' 
                                }}>
                                    {song.rhythm}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    );
}