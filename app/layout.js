// app/layout.js (CÓDIGO FINAL CON TEMA ELEGANTE Y AJUSTE DE PADDING FIJO)

import './globals.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './AuthContext';

export const metadata = {
  title: 'CIAC Allin Kawsay | Portal Interno',
  description: 'Material de ensayo y agenda del C.I.A.C. Allin Kawsay',
};

export default function RootLayout({ children }) {
  
  // Definición de las nuevas variables de color (Más profesional)
  const themeColors = {
    granateOscuro: '#5C001F', // Principal (headers)
    granateMedio: '#A80036', // Secundario (titles)
    doradoSuave: '#C8A952',   // Nuevo Acento (más elegante)
    fondoClaro: '#F7F7F7',    // Fondo general (no blanco puro)
    textoOscuro: '#1A1A1A',
  };

  const globalStyles = `
    html, body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Times New Roman', Times, serif; /* Fuente más clásica y seria */
      background-color: ${themeColors.fondoClaro};
      color: ${themeColors.textoOscuro};
    }
    
    /* --- REGLAS .main-container AJUSTADAS PARA EL HEADER FIJO --- */
    .main-container {
      /* Padding superior de 130px para compensar la altura del header fijo (Logo + Menú) */
      padding: 130px 40px 20px 40px; 
      max-width: 1200px;
      margin: 0 auto;
      min-height: calc(100vh - 130px); /* Altura mínima ajustada */
    }

    /* Estilo de sombra más sutil para todos los componentes (cards, modals) */
    .subtle-shadow {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.12);
        transition: box-shadow 0.3s ease;
    }
    
    /* Efecto hover limpio para tarjetas */
    .subtle-shadow:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.16);
    }
    
    /* Ajustes específicos para pantallas pequeñas */
    @media (max-width: 600px) {
        .main-container {
            /* Ajuste de padding en móvil */
            padding: 130px 15px 15px 15px;
        }
    }
  `;

  return (
    <html lang="es">
      <body>
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}