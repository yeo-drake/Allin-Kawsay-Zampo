// app/components/Navbar.js (CÓDIGO FINAL CON LOGO Y SCROLLBAR CORREGIDO)
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Definición del nuevo acento de color
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
        // Esta es la barra principal (el fondo granate)
        backgroundColor: GRANATE_OSCURO, 
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        padding: '0 0 0 0', // Eliminamos padding general para controlarlo internamente
    };
    
    // Contenedor principal para el logo y la barra de navegación
    const headerContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Para separar logo de enlaces
        padding: '10px 20px',
        borderBottom: `1px solid ${DORADO_SUAVE}55`, // Separador sutil
    };

    const logoStyle = {
        width: '50px', 
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: `2px solid ${DORADO_SUAVE}`,
    };

    // CONTENEDOR DE SCROLL HORIZONTAL
    const navContainerStyle = {
        overflowX: 'auto', 
        whiteSpace: 'nowrap', 
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        padding: '10px 20px', // Padding arriba y abajo para separar del logo
        justifyContent: 'center', // Para centrar los links si caben
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
            {/* SECCIÓN SUPERIOR CON LOGO */}
            <div style={headerContainerStyle}>
                <Link href="/">
                    {/* El logo se vuelve un enlace a Inicio */}
                    <img 
                        src="/logo.png" 
                        alt="Logo CIAC Allin Kawsay" 
                        style={logoStyle} 
                    />
                </Link>
                {/* Puedes poner el botón de Logout aquí si quieres */}
                <div style={{color: DORADO_SUAVE}}>
                    {/* {auth.isAuthenticated && <LogoutButton />} */}
                </div>
            </div>

            {/* SECCIÓN INFERIOR SCROLLABLE (Menú) */}
            {/* AGREGAMOS LA CLASE scrollable-navbar para el estilo CSS global */}
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