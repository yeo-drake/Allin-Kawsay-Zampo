// app/components/Navbar.js (CÓDIGO FINAL CON SCROLL HORIZONTAL PARA MÓVILES)
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    // LISTA COMPLETA DE ENLACES
    const links = [
        { href: '/', label: 'Inicio' },
        { href: '/historia', label: 'Historia' },
        { href: '/repertorio', label: 'Repertorio' },
        { href: '/eventos', label: 'Agenda de Eventos' },
        { href: '/galeria', label: 'Galería' },
    ];

    const navbarStyle = {
        // Esta es la barra principal (el fondo granate)
        padding: '15px 0', // Ajustamos padding horizontal para no cortar el scroll
        backgroundColor: '#5C001F', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    };
    
    // NUEVO CONTENEDOR PARA EL SCROLL
    const navContainerStyle = {
        // Permite el desplazamiento horizontal cuando el contenido es demasiado ancho
        overflowX: 'auto', 
        // Evita que los enlaces salten a la siguiente línea
        whiteSpace: 'nowrap', 
        // Hacemos que el contenido interno sea flexible para que los links estén alineados
        display: 'flex',
        justifyContent: 'center', // Centra los enlaces si hay espacio
        alignItems: 'center',
        gap: '25px',
        padding: '0 20px', // Padding horizontal para que los bordes no se peguen a la pantalla
    };

    const linkStyle = (href) => ({
        // Es importante usar 'display: inline-block' en los links dentro de un white-space: nowrap
        display: 'inline-block', 
        color: pathname === href ? '#FFD700' : 'white',
        textDecoration: 'none',
        fontSize: '1.1em',
        fontWeight: pathname === href ? 'bold' : 'normal',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'color 0.2s, border-bottom 0.2s',
        borderBottom: pathname === href ? '2px solid #FFD700' : 'none',
        // Aseguramos que los links tengan un tamaño fijo para el scroll
        flexShrink: 0, 
    });

    return (
        <nav style={navbarStyle}>
            <div style={navContainerStyle}> 
                {links.map((link) => (
                    <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}