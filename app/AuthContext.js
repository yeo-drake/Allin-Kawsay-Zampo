"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import LoginModal from './components/LoginModal';
import WelcomePWA from './components/WelcomePWA'; // 🚨 IMPORTAR EL COMPONENTE PWA

// --- CONFIGURACIÓN DE SEGURIDAD ---
const rawPassword = process.env.NEXT_PUBLIC_PASSWORD;
const CORRECT_PASSWORD = rawPassword ? rawPassword.trim() : null; 
const SESSION_TIMEOUT_MINUTES = 10; 

// Crear el Contexto
const AuthContext = createContext();

// Hook personalizado para usar la autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // 🚨 Nuevo estado para controlar si la verificación PWA inicial ha terminado
    const [isPwaCheckCompleted, setIsPwaCheckCompleted] = useState(false); 
    
    const timerIdRef = useRef(null);

    const clearTimer = () => {
        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        }
    };
    
    // Función de callback para WelcomePWA. Se usa useCallback para evitar renderizados innecesarios.
    const handlePwaCheckComplete = useCallback((shouldProceedToApp) => {
        setIsPwaCheckCompleted(shouldProceedToApp);
        // Si no debemos proceder, entonces isLoading sigue siendo true, y WelcomePWA se renderiza.
        if (shouldProceedToApp) {
            setIsLoading(false); // Una vez que se resuelve PWA, pasamos al chequeo de autenticación
        }
    }, []);

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
        // 🚨 Solo proceder con la lógica de autenticación si la verificación PWA ha terminado.
        if (!isPwaCheckCompleted) {
            // El estado inicial es isLoading=true, por lo que se renderiza el WelcomePWA
            return; 
        }

        const expiry = localStorage.getItem('sessionExpiry');
        
        if (expiry && Date.now() < parseInt(expiry)) {
            setIsAuthenticated(true);
            const remainingTime = parseInt(expiry) - Date.now();
            
            // Reestablecer el timer con el tiempo restante
            timerIdRef.current = setTimeout(logout, remainingTime);
            
        } else {
            setIsAuthenticated(false);
            localStorage.removeItem('sessionExpiry');
        }
        
        // Una vez que el chequeo de sesión se hace, dejamos de "cargar"
        setIsLoading(false);

        return () => {
            clearTimer();
        };
    }, [isPwaCheckCompleted]); // Dependencia clave

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

    // 1. Mostrar la pantalla de bienvenida PWA ANTES de la carga y la autenticación
    // WelcomePWA controla si debe mostrarse a sí mismo (hay prompt?) y usa el callback.
    if (!isPwaCheckCompleted) {
        return <WelcomePWA onInstallationCheckComplete={handlePwaCheckComplete} />;
    }
    
    // 2. Si estamos cargando la sesión (y PWA check ya terminó), mostrar null o un loader si lo deseas
    if (isLoading) {
        return null; 
    }
    
    // 3. Renderizar la aplicación normal o el modal de login
    return (
        <AuthContext.Provider value={value}>
            {isAuthenticated ? children : <LoginModal />}
        </AuthContext.Provider>
    );
};

// Exportar useAuth aquí también para asegurar compatibilidad con tu código
// ya que estaba en la versión anterior:
// export function useAuth() {
//     return useContext(AuthContext);
// }