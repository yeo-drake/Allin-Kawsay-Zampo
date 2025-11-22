// app/components/Navbar.js (CÓDIGO FINAL Y CORREGIDO)
"use client"; 

import { useState } from 'react'; 

const GROUP_NAME = "C.I.A.C. Allin Kawsay Juliaca"; 
    
const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Repertorio", path: "/repertorio" },
    { name: "Historia", path: "/nosotros" },
    { name: "Galería", path: "/galeria" },
];
    
export default function Navbar() {
    const logoPath = "/logo.png"; 
    
    // Estilos con la nueva paleta
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5C001F', 
        padding: '10px 30px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    };
    
    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#F8F8F8', 
        fontSize: '1.2em',
        fontWeight: 'bold',
    };
    
    const logoImageStyle = {
        width: '40px', 
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
        objectFit: 'cover',
    };
    
    const linksStyle = {
        display: 'flex',
        gap: '25px',
    };
    
    const linkItemStyle = {
        color: '#FFD700', 
        textDecoration: 'none',
        fontSize: '0.9em',
        fontWeight: '500',
        transition: 'color 0.2s, background-color 0.2s',
        padding: '5px 8px',
        borderRadius: '5px',
    };
    
    const [hoveredLink, setHoveredLink] = useState(null);
    
    return (
        <nav style={navStyle}>
            <div style={logoContainerStyle}>
                <img src={logoPath} alt="Logo del Grupo" style={logoImageStyle} />
                {GROUP_NAME}
            </div>
            <div style={linksStyle}>
                {navLinks.map((link) => {
                    const currentStyle = {
                        ...linkItemStyle,
                        backgroundColor: hoveredLink === link.name ? '#A80036' : 'transparent',
                    };

                    return (
                        <a 
                            key={link.name} 
                            href={link.path} 
                            style={currentStyle}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            {link.name}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}