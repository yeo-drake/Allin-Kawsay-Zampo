// app/components/AppShell.js (NUEVO ARCHIVO)
"use client";

import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";
import LoginModal from "./LoginModal";
import React from 'react'; // Necesario para componentes de cliente

export default function AppShell({ children }) {
    const { isAuthenticated, loading } = useAuth();

    // 1. Mostrar spinner mientras cargamos Local Storage
    if (loading) {
        // En un entorno de producción, puedes poner un spinner visible aquí
        return (
            <div style={{textAlign: 'center', padding: '50px'}}>
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
            {children}
        </>
    );
}