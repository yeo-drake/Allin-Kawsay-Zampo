// app/eventos/page.js (NUEVA PÁGINA DE AGENDA)
"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../utils/firebase'; 

// Componente para mostrar una tarjeta de evento
const EventCard = ({ title, date, location, description, isRequired }) => {
    
    // Formatear la fecha
    const formattedDate = date.toLocaleDateString('es-ES', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    // Estilos basados en la prioridad
    const cardStyle = {
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '15px',
        borderLeft: isRequired ? '6px solid #A80036' : '6px solid #FFD700', // Rojo para obligatorio, Dorado para opcional
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
    };

    const titleStyle = {
        color: '#5C001F',
        fontSize: '1.4em',
        marginBottom: '5px',
    };

    const dateStyle = {
        color: isRequired ? '#A80036' : '#555',
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: '1.1em',
    };

    const requirementTagStyle = {
        display: 'inline-block',
        padding: '5px 10px',
        borderRadius: '5px',
        backgroundColor: isRequired ? '#A80036' : '#FFD700',
        color: isRequired ? 'white' : '#5C001F',
        fontWeight: 'bold',
        fontSize: '0.8em',
        marginBottom: '10px',
    };

    return (
        <div style={cardStyle}>
            <div style={requirementTagStyle}>
                {isRequired ? 'ASISTENCIA OBLIGATORIA' : 'Evento Opcional'}
            </div>
            <h2 style={titleStyle}>{title}</h2>
            <p style={dateStyle}>🗓️ {formattedDate}</p>
            <p style={{color: '#333', marginBottom: '5px'}}>📍 Lugar: {location || 'No especificado'}</p>
            {description && <p style={{fontSize: '0.9em', color: '#666'}}>Detalles: {description}</p>}
        </div>
    );
};


export default function EventosPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Lógica para cargar los eventos
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Importante: coleccion 'eventos'
                const querySnapshot = await getDocs(collection(db, 'eventos')); 
                const eventsList = [];
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    eventsList.push({
                        id: doc.id,
                        ...data,
                        // Convertir el timestamp de Firestore a objeto Date
                        date: data.date ? data.date.toDate() : new Date(), 
                    });
                });

                // Ordenar los eventos: primero por fecha (ascendente), mostrando el más cercano
                eventsList.sort((a, b) => a.date.getTime() - b.date.getTime());

                setEvents(eventsList);
            } catch (error) {
                console.error("Error al cargar los eventos: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // 2. Filtramos para separar eventos futuros de pasados
    const now = Date.now();
    const futureEvents = events.filter(event => event.date.getTime() >= now);
    const pastEvents = events.filter(event => event.date.getTime() < now).reverse(); // Pasados se muestran del más reciente al más antiguo


    if (loading) {
        return (
            <main className="main-container">
                <h1>Agenda y Eventos</h1>
                <p>Cargando eventos...</p>
            </main>
        );
    }
    
    const subtitleStyle = {
        color: '#A80036',
        fontSize: '1.8em',
        borderBottom: '2px solid #FFD700',
        paddingBottom: '5px',
        marginTop: '30px',
        marginBottom: '20px',
    };


    return (
        <main className="main-container"> 
            <h1>📅 Agenda y Eventos C.I.A.C.</h1>
            
            {/* EVENTOS PRÓXIMOS */}
            <h2 style={subtitleStyle}>Próximos Eventos ({futureEvents.length})</h2>
            
            {futureEvents.length > 0 ? (
                futureEvents.map((event) => (
                    <EventCard 
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                        isRequired={event.isRequired || false}
                    />
                ))
            ) : (
                <p style={{fontSize: '1.1em', color: '#5C001F'}}>🎉 ¡No hay eventos próximos agendados por ahora!</p>
            )}

            {/* EVENTOS PASADOS */}
            <h2 style={subtitleStyle}>Eventos Pasados ({pastEvents.length})</h2>
            
            {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                    <EventCard 
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                        isRequired={event.isRequired || false}
                    />
                ))
            ) : (
                <p>Aún no hay registros de eventos pasados.</p>
            )}

        </main>
    );
}