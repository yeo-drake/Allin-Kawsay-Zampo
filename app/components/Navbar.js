// app/components/Navbar.js (CÓDIGO FINAL: ENCABEZADO FIJO Y APILADO)
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DORADO_SUAVE = '#C8A952'; 
const GRANATE_OSCURO = '#5C001F';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Inicio' },
        { href: '/historia', label: 'Historia' },
        { href: '/repertorio', label: 'Repertorio' },
        { href: '/eventos', label: 'Agenda de Eventos' },
        { href: '/galeria', label: 'Galería' },
    ];

    const navbarStyle = {
        // --- Hacemos todo el encabezado FIJO ---
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9990, // Se mantiene siempre encima
        backgroundColor: GRANATE_OSCURO, 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    };
    
    // Contenedor principal para el logo (ahora centrado)
    const headerContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        // Centramos el logo horizontalmente
        justifyContent: 'center', 
        padding: '10px 20px',
    };

    const logoStyle = {
        width: '60px', // Un poco más grande
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: `3px solid ${DORADO_SUAVE}`, 
    };

    // CONTENEDOR DE SCROLL HORIZONTAL (Menú)
    const navContainerStyle = {
        overflowX: 'auto', 
        whiteSpace: 'nowrap', 
        display: 'flex',
        alignItems: 'center',
        // FIX VISIBILIDAD: Alineamos a la izquierda (flex-start) para que "Inicio" sea visible
        justifyContent: 'flex-start', 
        gap: '25px',
        padding: '10px 20px', 
        borderTop: `1px solid ${DORADO_SUAVE}55`, // Separador visual
    };

    const linkStyle = (href) => ({
        display: 'inline-block', 
        color: pathname === href ? DORADO_SUAVE : 'white',
        textDecoration: 'none',
        fontSize: '1.1em',
        fontWeight: pathname === href ? 'bold' : 'normal',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'color 0.2s, border-bottom 0.2s',
        borderBottom: pathname === href ? `2px solid ${DORADO_SUAVE}` : 'none', 
        flexShrink: 0, 
    });

    return (
        <nav style={navbarStyle}>
            {/* 1. SECCIÓN SUPERIOR: LOGO CENTRADO */}
            <div style={headerContainerStyle}>
                <Link href="/">
                    <img 
                        src="/logo.png" 
                        alt="Logo CIAC Allin Kawsay" 
                        style={logoStyle} 
                    />
                </Link>
            </div>

            {/* 2. SECCIÓN INFERIOR: MENÚ SCROLLABLE */}
            <div style={navContainerStyle} className="scrollable-navbar"> 
                {links.map((link) => (
                    <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}