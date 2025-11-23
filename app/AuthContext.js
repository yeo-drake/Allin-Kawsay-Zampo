// app/AuthContext.js (CÓDIGO MODIFICADO PARA COMPARTIR EL TIEMPO DE EXPIRACIÓN)
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const SESSION_DURATION = 10 * 60 * 1000; // 10 minutos
const STORAGE_KEY = 'ciac_access_session';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // NUEVO ESTADO: Almacenará la marca de tiempo de expiración
  const [expiryTime, setExpiryTime] = useState(0); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_KEY);
    let sessionValid = false;
    let storedExpiry = 0;
    
    if (storedSession) {
        try {
            const sessionData = JSON.parse(storedSession);
            storedExpiry = sessionData.expiry;
            
            if (
                sessionData.token === process.env.NEXT_PUBLIC_SITE_PASSWORD &&
                Date.now() < sessionData.expiry 
            ) {
                sessionValid = true;
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    
    setIsAuthenticated(sessionValid);
    if (sessionValid) {
        setExpiryTime(storedExpiry); // SOLO guarda la expiración si la sesión es válida
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    const isCorrect = password === process.env.NEXT_PUBLIC_SITE_PASSWORD;
    
    if (isCorrect) {
        const newExpiryTime = Date.now() + SESSION_DURATION;
        const sessionData = {
            token: process.env.NEXT_PUBLIC_SITE_PASSWORD,
            expiry: newExpiryTime
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
        setIsAuthenticated(true);
        setExpiryTime(newExpiryTime); // <-- Actualizar el estado con el nuevo tiempo
        return true;
    }
    return false;
  };

  // El contexto ahora comparte el tiempo de expiración
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loading, expiryTime }}> 
      {children}
    </AuthContext.Provider>
  );
};