// app/components/InstallPrompt.js
"use client";

import { useState, useEffect } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  // Colores C.I.A.C.
  const GRANATE_OSCURO = '#5C001F';
  const DORADO_SUAVE = '#C8A952';

  // 1. Escuchar el evento 'beforeinstallprompt' del navegador
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Previene que se muestre el prompt por defecto del navegador
      e.preventDefault(); 
      // Guarda el evento para usarlo más tarde
      setDeferredPrompt(e);
      // Muestra nuestro banner personalizado
      setIsVisible(true); 
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Limpieza: elimina el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // 2. Manejar la acción de instalación
  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Muestra el prompt de instalación guardado
      deferredPrompt.prompt();
      // Espera la respuesta del usuario
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó la instalación A2HS');
        } else {
          console.log('El usuario rechazó la instalación A2HS');
        }
        // Oculta el banner después de la interacción
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };
  
  // No mostrar el banner si no es visible, ya se instaló, o no hay prompt
  if (!isVisible || !deferredPrompt) {
    return null;
  }
  
  // Estilos del Banner
  const bannerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    padding: '15px',
    backgroundColor: theme === 'dark' ? GRANATE_OSCURO : DORADO_SUAVE,
    color: theme === 'dark' ? 'white' : GRANATE_OSCURO,
    textAlign: 'center',
    boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px'
  };

  const buttonStyle = {
    backgroundColor: theme === 'dark' ? DORADO_SUAVE : GRANATE_OSCURO,
    color: theme === 'dark' ? GRANATE_OSCURO : 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: theme === 'dark' ? 'white' : GRANATE_OSCURO,
    fontSize: '1.2em',
    cursor: 'pointer'
  };


  return (
    <div style={bannerStyle}>
      <p style={{ margin: 0, flexGrow: 1, textAlign: 'left', fontWeight: '500' }}>
        🚀 **¿Quieres la App?** Instala C.I.A.C. Allin Kawsay para acceso instantáneo.
      </p>
      <button 
        onClick={handleInstallClick} 
        style={buttonStyle}
      >
        <FaDownload /> Instalar
      </button>
      <button 
        onClick={() => setIsVisible(false)} 
        style={closeButtonStyle}
      >
        <FaTimes />
      </button>
    </div>
  );
}