"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '../ThemeContext'; 
import { FaDownload } from 'react-icons/fa';

/**
 * Componente que muestra una pantalla de bienvenida antes del login,
 * promoviendo la instalación de la aplicación como PWA.
 * * @param {function} onInstallationCheckComplete - Callback para notificar al AuthProvider que la verificación PWA ha terminado.
 */
export default function WelcomePWA({ onInstallationCheckComplete }) {
  // Asegúrate de que useTheme está disponible, si no, puedes eliminarlo y usar colores fijos
  // Si no tienes ThemeContext, comenta la línea de useTheme y define los colores estáticamente:
  const { theme } = useTheme(); 
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Colores C.I.A.C.
  const GRANATE_OSCURO = '#5C001F';
  const DORADO_SUAVE = '#C8A952';

  // Determinar colores según el tema (o usar los fijos si no hay ThemeContext)
  const bgColor = theme === 'dark' ? GRANATE_OSCURO : '#f0f0f0';
  const textColor = theme === 'dark' ? DORADO_SUAVE : GRANATE_OSCURO;
  const buttonBgColor = theme === 'dark' ? DORADO_SUAVE : GRANATE_OSCURO;
  const buttonTextColor = theme === 'dark' ? GRANATE_OSCURO : 'white';
  
  // Estado para saber si el componente debe renderizarse (si se puede instalar)
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. Detectar si la PWA ya está instalada (heurística)
    const isPWAInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.includes('android-app');
    
    // Si ya está instalada, terminamos la verificación y permitimos el acceso.
    if (isPWAInstalled) {
      onInstallationCheckComplete(true);
      return;
    }
    
    // 2. Escuchar el evento 'beforeinstallprompt'
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); 
      setDeferredPrompt(e);
      // Si recibimos el prompt, significa que SÍ se puede instalar, entonces debemos renderizar.
      setShouldRender(true);
      // Notificamos al AuthProvider que la verificación ha terminado (y el resultado es false -> mostrar bienvenida)
      onInstallationCheckComplete(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Si el navegador no emitió el evento después de un momento, asumimos que no es elegible
    // para la instalación y pasamos al Login. (Timeout es una medida de seguridad)
    const timeout = setTimeout(() => {
        if (!deferredPrompt) {
            onInstallationCheckComplete(true); // Pasar al login si no se puede instalar
        }
    }, 1000); // Esperar 1 segundo

    // Limpiar listeners y timeout
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timeout);
    };
  }, [onInstallationCheckComplete, deferredPrompt]);


  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); 
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('El usuario aceptó la instalación de la PWA');
      } else {
        console.log('El usuario rechazó la instalación de la PWA');
      }
      setDeferredPrompt(null);
    }
    // Después de la interacción, siempre pasamos al flujo normal de la aplicación
    onInstallationCheckComplete(true); 
  };

  // Solo renderizar si se puede instalar (deferredPrompt existe) y no ha terminado el chequeo
  if (!shouldRender) {
      return null;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: bgColor,
      color: textColor,
      textAlign: 'center',
      padding: '20px',
      gap: '25px',
    }}>
      <Image 
        src="/logo.jpg" 
        alt="Logo CIAC Allin Kawsay" 
        width={200} 
        height={200} 
        priority={true}
        style={{ borderRadius: '20px', boxShadow: `0 8px 30px rgba(0, 0, 0, 0.3)` }}
      />
      
      <h1 className="text-4xl md:text-5xl font-extrabold" style={{ margin: '0', color: textColor }}>
        C.I.A.C. Allin Kawsay
      </h1>

      <p style={{ 
        fontSize: '1.2em', 
        fontWeight: 'bold', 
        color: DORADO_SUAVE, 
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        Portal PWA dirigido a músicos del Sikuri, en especial a C.I.A.C. Allin Kawsay de Juliaca.
      </p>

      {deferredPrompt && ( 
        <button 
          onClick={handleInstallClick} 
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
            border: 'none',
            padding: '12px 25px',
            borderRadius: '10px',
            fontSize: '1.2em',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s, background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
          // Se dejan las funciones onMouseEnter/onMouseLeave para una mejor UX
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <FaDownload /> Instalar Aplicación
        </button>
      )}
      
      {/* Botón para saltar e ir al login, en caso de que no se pueda instalar o el usuario quiera continuar */}
       <button 
          onClick={() => onInstallationCheckComplete(true)} 
          style={{
            background: 'none',
            border: 'none',
            color: textColor,
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}
        >
          Continuar al Login
        </button>
    </div>
  );
}