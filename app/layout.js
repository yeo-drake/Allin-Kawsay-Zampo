// app/layout.js (CÓDIGO FINAL)
import './globals.css';
import Navbar from './components/Navbar'; 
    
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
            </body>
        </html>
    );
}