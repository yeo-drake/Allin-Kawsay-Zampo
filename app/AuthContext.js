// app/AuthContext.js (NUEVO ARCHIVO)
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Al cargar, verifica si el token de acceso ya existe en el navegador
    const storedAuth = localStorage.getItem('ciac_access_token');
    
    // Si el token existe y coincide con la clave secreta guardada en el .env,
    // asumimos que ya tienen acceso.
    if (storedAuth === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
        setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    // 2. Compara la contraseña ingresada con la contraseña secreta de Vercel/Next.js
    const isCorrect = password === process.env.NEXT_PUBLIC_SITE_PASSWORD;
    
    if (isCorrect) {
        // Guarda un token de acceso en Local Storage para evitar pedir la contraseña en cada visita
        localStorage.setItem('ciac_access_token', process.env.NEXT_PUBLIC_SITE_PASSWORD);
        setIsAuthenticated(true);
        return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};