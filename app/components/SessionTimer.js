// app/components/SessionTimer.js (CÓDIGO CORREGIDO Y ESTABILIZADO)
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext'; 

// Colores del tema
const GRANATE_OSCURO = '#5C001F';
const DORADO_SUAVE = '#C8A952'; 
const ROJO_ALERTA = '#A80036';

// Duración total de la sesión (10 minutos)
const SESSION_TIMEOUT_MINUTES = 10;
const TOTAL_DURATION_MS = SESSION_TIMEOUT_MINUTES * 60 * 1000; 

export default function SessionTimer() {
    const { logout } = useAuth();
    const [remainingTime, setRemainingTime] = useState(0);
    const [progress, setProgress] = useState(100);
    const intervalRef = useRef(null);

    useEffect(() => {
        const calculateTime = () => {
            const expiry = localStorage.getItem('sessionExpiry');
            
            if (!expiry) {
                logout(); 
                if (intervalRef.current) clearInterval(intervalRef.current);
                return 0;
            }

            const now = Date.now();
            const expiryTime = parseInt(expiry);
            let timeDiff = expiryTime - now;

            if (timeDiff <= 0) {
                logout();
                if (intervalRef.current) clearInterval(intervalRef.current);
                return 0;
            }
            
            // P-2 CORRECCIÓN CLAVE: Estabilizamos el progreso inicial.
            // Si el tiempo restante es muy cercano (menos de 1 segundo) al total, 
            // lo forzamos al 100% para asegurar que la barra inicie llena.
            let currentProgress;
            
            if (timeDiff >= TOTAL_DURATION_MS - 1000) { 
                currentProgress = 100;
            } else {
                currentProgress = (timeDiff / TOTAL_DURATION_MS) * 100;
            }
            
            setRemainingTime(timeDiff);
            setProgress(Math.min(100, Math.max(0, currentProgress))); 
        };

        calculateTime();
        intervalRef.current = setInterval(calculateTime, 1000); 

        return () => clearInterval(intervalRef.current);
    }, [logout]);


    // Formatear milisegundos a HH:MM:SS
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    // --- Estilos del Temporizador ---
    
    const timerContainerStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '250px', 
        zIndex: 9995, 
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '10px 15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
        border: `1px solid ${GRANATE_OSCURO}`,
        textAlign: 'center',
        opacity: progress < 5 ? 0.7 : 1, 
    };
    
    const progressBarContainer = {
        height: '10px',
        backgroundColor: '#eee',
        borderRadius: '5px',
        marginBottom: '8px',
        overflow: 'hidden',
    };

    const barColor = progress < 10 ? ROJO_ALERTA : DORADO_SUAVE;
    
    const progressBar = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: barColor,
        transition: 'width 1s linear, background-color 0.5s',
    };


    return (
        <div style={timerContainerStyle}>
            <div style={{color: GRANATE_OSCURO, fontWeight: 'bold', marginBottom: '5px'}}>
                Tiempo Restante de Sesión
            </div>
            
            <div style={progressBarContainer}>
                <div style={progressBar}></div>
            </div>
            
            <div style={{color: GRANATE_OSCURO, fontSize: '1.2em'}}>
                {formatTime(remainingTime)}
            </div>
            
            <button 
                onClick={logout} 
                style={{
                    marginTop: '10px', 
                    padding: '5px 10px', 
                    backgroundColor: GRANATE_OSCURO, 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}