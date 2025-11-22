// app/layout.js (CÓDIGO CORREGIDO Y FINAL)
import './globals.css';
import AppProgress from './components/ProgressBar'; 
import { AuthProvider } from './AuthContext'; // Solo necesitamos el Provider aquí
import AppShell from './components/AppShell'; // <-- ¡NUEVO COMPONENTE DE CLIENTE!

export const metadata = {
    title: 'C.I.A.C. Allin Kawsay', 
    description: 'Repertorio y Cultura del C.I.A.C. Allin Kawsay de Juliaca',
};
    
export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <AuthProvider>
                    {/* El AppShell ahora gestiona la Navbar y el LoginModal */}
                    <AppShell>
                        {children}
                    </AppShell>
                </AuthProvider>
                <AppProgress /> 
            </body>
        </html>
    );
}