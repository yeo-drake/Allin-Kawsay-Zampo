// app/components/ViewToggle.js (CÓDIGO FINAL CON LÓGICA DE DOS BOTONES)
"use client";

import { FaList, FaTh } from 'react-icons/fa'; // Usamos FaTh para la vista de cuadrícula (mediana/grande)
import { useTheme } from '../ThemeContext';

// Recibimos la nueva prop 'allowedViews'
export default function ViewToggle({ viewMode, setViewMode, allowedViews = ['list', 'grid'] }) {
    const { theme } = useTheme();

    const buttonBaseStyle = {
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        border: '1px solid var(--color-border)',
        transition: 'background-color 0.3s, color 0.3s',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1em',
        backgroundColor: 'var(--color-card-bg)',
        color: 'var(--color-text)',
        minWidth: '100px',
        justifyContent: 'center',
    };

    const activeStyle = {
        backgroundColor: theme === 'dark' ? '#C8A952' : '#5C001F', // Dorado o Granate
        color: theme === 'dark' ? '#5C001F' : 'white',
        fontWeight: 'bold',
        borderColor: theme === 'dark' ? '#C8A952' : '#5C001F',
    };

    // Definimos las vistas y sus iconos correspondientes
    const viewOptions = [
        { mode: 'list', icon: FaList, label: 'Listado' },
        { mode: 'grid', icon: FaTh, label: 'Cuadrícula' }, // Usamos 'grid' para la vista mediana
        // Ya no incluimos 'large' aquí para simplificar a dos vistas
    ];

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {viewOptions
                // 🚨 FILTRADO CLAVE: Solo renderizamos los botones que están permitidos
                .filter(option => allowedViews.includes(option.mode))
                .map(({ mode, icon: Icon, label }) => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        style={{ ...buttonBaseStyle, ...(viewMode === mode ? activeStyle : {}) }}
                    >
                        <Icon />
                        {label}
                    </button>
                ))
            }
        </div>
    );
}