// app/ThemeContext.js (NUEVO ARCHIVO)
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Crea el Contexto
const ThemeContext = createContext();

// Hook para usar el tema
export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    // 1. Inicializa el tema leyendo el valor de localStorage, por defecto 'light'
    const [theme, setTheme] = useState('light');

    // 2. Efecto para cargar el tema desde el almacenamiento local
    useEffect(() => {
        // Obtenemos el tema guardado o el valor del sistema del usuario si no hay nada guardado
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Si hay un tema guardado, lo usamos. Si no, usamos la preferencia del sistema.
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (systemPrefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    // 3. Efecto para aplicar la clase 'dark' o 'light' al body HTML
    useEffect(() => {
        const body = document.body;
        // Limpiamos las clases existentes
        body.classList.remove('light', 'dark');
        // Añadimos la clase del tema actual
        body.classList.add(theme);
        
        // Guardamos la preferencia del usuario
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    // Función para cambiar el tema
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};