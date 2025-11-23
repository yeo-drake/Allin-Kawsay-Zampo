// app/components/Navbar.js (CÓDIGO FINAL CON TODAS LAS PESTAÑAS)
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    // LISTA COMPLETA DE ENLACES
    const links = [
        { href: '/', label: 'Inicio' },
        { href: '/historia', label: 'Historia' }, // <-- RESTAURADA
        { href: '/repertorio', label: 'Repertorio' },
        { href: '/eventos', label: 'Agenda de Eventos' }, // <-- Existente
        { href: '/galeria', label: 'Galería' }, // <-- RESTAURADA
    ];

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '25px',
        padding: '15px 20px',
        backgroundColor: '#5C001F', // Granate Oscuro
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    };

    const linkStyle = (href) => ({
        color: pathname === href ? '#FFD700' : 'white', // Dorado si está activo
        textDecoration: 'none',
        fontSize: '1.1em',
        fontWeight: pathname === href ? 'bold' : 'normal',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'color 0.2s, background-color 0.2s',
        borderBottom: pathname === href ? '2px solid #FFD700' : 'none',
    });

    return (
        <nav style={navbarStyle}>
            {links.map((link) => (
                <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}