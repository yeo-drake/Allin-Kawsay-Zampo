// app/AuthContext.js (CÓDIGO FINAL LIMPIO Y CORREGIDO SIN IMPORTACIONES EN BUCLE)
"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import LoginModal from './components/LoginModal';

// --- CONFIGURACIÓN DE SEGURIDAD ---
const rawPassword = process.env.NEXT_PUBLIC_PASSWORD;
const CORRECT_PASSWORD = rawPassword ? rawPassword.trim() : null; 
const SESSION_TIMEOUT_MINUTES = 10; 

// Crear el Contexto
const AuthContext = createContext();

// Hook personalizado para usar la autenticación (Esta es la función que se exporta)
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const timerIdRef = useRef(null);

    const clearTimer = () => {
        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('sessionExpiry');
        clearTimer();
    };


    const startSessionTimer = () => {
        clearTimer(); 
        
        const expiryTime = Date.now() + SESSION_TIMEOUT_MINUTES * 60 * 1000;
        localStorage.setItem('sessionExpiry', expiryTime.toString());
        
        const timeoutId = setTimeout(() => {
            logout();
        }, SESSION_TIMEOUT_MINUTES * 60 * 1000);
        
        timerIdRef.current = timeoutId;
        return timeoutId;
    };
    
    useEffect(() => {
        const expiry = localStorage.getItem('sessionExpiry');
        
        if (expiry && Date.now() < parseInt(expiry)) {
            setIsAuthenticated(true);
            const remainingTime = parseInt(expiry) - Date.now();
            
            timerIdRef.current = setTimeout(logout, remainingTime);
            
        } else {
            setIsAuthenticated(false);
            localStorage.removeItem('sessionExpiry');
        }
        
        setIsLoading(false);

        return () => {
            clearTimer();
        };
    }, []); 

    const login = (password) => {
        if (!CORRECT_PASSWORD) {
            console.error("ERROR: La variable NEXT_PUBLIC_PASSWORD no está configurada.");
            return false;
        }

        if (password.trim() === CORRECT_PASSWORD) { 
            setIsAuthenticated(true);
            startSessionTimer();
            return true;
        }
        return false;
    };

    const value = {
        isAuthenticated,
        login,
        logout,
    };

    if (isLoading) {
        return null; 
    }
    
    return (
        <AuthContext.Provider value={value}>
            {isAuthenticated ? children : <LoginModal />}
        </AuthContext.Provider>
    );
};