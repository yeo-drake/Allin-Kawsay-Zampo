// app/layout.js (CÓDIGO FINAL CON BARRA DE PROGRESO)
import './globals.css';
import Navbar from './components/Navbar'; 
import AppProgress from './components/ProgressBar'; // <-- IMPORTAR COMPONENTE

export const metadata = {
    title: 'C.I.A.C. Allin Kawsay', 
    description: 'Repertorio y Cultura del C.I.A.C. Allin Kawsay de Juliaca',
};
    
export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <Navbar /> 
                {children}
                
                {/* INCLUIR LA BARRA DE PROGRESO AL FINAL */}
                <AppProgress /> 
            </body>
        </html>
    );
}