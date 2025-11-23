// app/components/SessionTimer.js (NUEVO COMPONENTE DE CUENTA REGRESIVA)
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; 

export default function SessionTimer() {
    const { expiryTime, isAuthenticated } = useAuth();
    const [timeLeft, setTimeLeft] = useState(0);

    // 1. Lógica del Temporizador: Calcula el tiempo restante cada segundo
    useEffect(() => {
        if (!isAuthenticated || expiryTime === 0) return;

        // Función que calcula el tiempo restante
        const calculateTimeLeft = () => {
            const difference = expiryTime - Date.now();
            return difference > 0 ? difference : 0;
        };
        
        // Establecer el tiempo inicial
        setTimeLeft(calculateTimeLeft());

        // Configurar el intervalo que se ejecuta cada segundo
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            // Si el tiempo llega a cero, forzamos la recarga para que el AuthContext
            // detecte que la sesión ha expirado y muestre el LoginModal
            if (newTimeLeft === 0) {
                clearInterval(timer);
                // Si la sesión expira mientras está abierto, recarga la página
                window.location.reload(); 
            }
        }, 1000);

        // Limpieza: importante para evitar fugas de memoria
        return () => clearInterval(timer);
    }, [isAuthenticated, expiryTime]);


    // 2. Lógica de Formato: Convierte milisegundos a M:SS
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        // Asegura que los segundos siempre tengan dos dígitos (ej: 05)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Estilo para el temporizador
    const timerStyle = {
        position: 'fixed',
        top: '60px', /* Justo debajo de la Navbar (asumiendo altura de 60px) */
        right: '20px',
        backgroundColor: timeLeft < 1 * 60 * 1000 ? '#A80036' : '#5C001F', /* Rojo si queda menos de 1 min */
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '0.9em',
        fontWeight: 'bold',
        zIndex: 999, /* Alto para que esté siempre visible */
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    };
    
    // Solo mostramos el timer si queda tiempo
    if (timeLeft === 0) return null;

    return (
        <div style={timerStyle}>
            Sesión expira en: {formatTime(timeLeft)}
        </div>
    );
}