// app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";

// 🚨 Importaciones de CSS necesarias para react-pdf (Añadidas aquí)
import 'react-pdf/dist/Page/AnnotationLayer.css'; 
import 'react-pdf/dist/Page/TextLayer.css';

// 🚨 CAMBIO CRUCIAL: Importación del archivo para configurar el PDF Worker.
// Esto DEBE ejecutarse antes de que se cargue cualquier componente que use react-pdf.

import { AuthProvider } from './AuthContext'; 
import { ThemeProvider } from './ThemeContext'; 
import Navbar from './components/Navbar';
import SessionTimer from './components/SessionTimer'; 
import { Suspense } from 'react';
import InstallPrompt from './components/InstallPrompt';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CIAC Portal Privado",
    description: "Portal privado de partituras y recursos para la Corporación Internacional de Artes CIAC Allin Kawsay.",
    // 🚨 Integración del MANIFEST PWA 🚨
    manifest: '/manifest.json', 
};

// Componente para manejar el estado de la cabecera
function LayoutContent({ children }) {
    return (
        // La clase 'subtle-shadow' se aplica globalmente aquí
        <div className="flex flex-col min-h-screen"> 
            <Suspense fallback={<div>Cargando...</div>}>
                <Navbar />
            </Suspense>
            <main className="flex-grow p-4 md:p-8" style={{ marginTop: '70px' }}> 
                {children}
            </main>
            <SessionTimer />
            {/* El Footer es opcional, lo dejamos comentado si no lo usas */}
        </div>
    );
}

export default function RootLayout({ children }) {
// prettier-ignore
return (
    <html lang="es">
        <body className={inter.className}>
            {/* P-3: El ThemeProvider envuelve todo */}
            <ThemeProvider> 
                <AuthProvider>
                    <LayoutContent>{children}</LayoutContent>
                    {/* 🚨 Integración del banner de instalación PWA (P-9) 🚨 */}
                    <InstallPrompt />
                </AuthProvider>
            </ThemeProvider>
        </body>
    </html>
);
}