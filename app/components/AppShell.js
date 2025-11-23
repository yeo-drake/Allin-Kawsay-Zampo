// app/components/AppShell.js (CÓDIGO FINAL CON TEMPORIZADOR)
"use client";

import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";
import LoginModal from "./LoginModal";
import SessionTimer from "./SessionTimer"; // <-- Importamos el Timer
import React from 'react'; 

export default function AppShell({ children }) {
    const { isAuthenticated, loading } = useAuth();

    // 1. Mostrar spinner mientras cargamos Local Storage
    if (loading) {
        return (
            <div style={{textAlign: 'center', padding: '50px', color: '#5C001F'}}>
                Cargando configuración de acceso...
            </div>
        ); 
    }

    // 2. Si NO está autenticado, muestra el modal de login (bloquea la pantalla)
    if (!isAuthenticated) {
        return <LoginModal />;
    }

    // 3. Si está autenticado, muestra el contenido normal
    return (
        <>
            <Navbar />
            <SessionTimer /> {/* <-- El temporizador se renderiza aquí */}
            {children}
        </>
    );
}