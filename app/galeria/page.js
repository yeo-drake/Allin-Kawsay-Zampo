// app/galeria/page.js (PÁGINA FINAL CON MINIATURAS DE YOUTUBE)
"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; 
import { db } from '../../utils/firebase'; 
import GalleryModal from '../components/GalleryModal';

// --- FUNCIÓN DE UTILIDAD ---
// Extrae el ID del video de YouTube desde la URL
const getYoutubeVideoId = (url) => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
};

// Componente para renderizar un ítem de la galería
const GalleryItem = ({ item, onClick }) => {
    
    const { title, type, url } = item;

    const cardStyle = {
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.3s',
        cursor: 'pointer',
    };
    
    const titleStyle = {
        padding: '10px',
        backgroundColor: '#5C001F',
        color: 'white',
        fontSize: '1.1em',
        textAlign: 'center',
    };

    const mediaContainerStyle = {
        height: '250px', 
        width: '100%',
        overflow: 'hidden',
        position: 'relative', // Para posicionar el ícono de "Play"
    };
    
    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };
    
    // Estilo para el ícono de Play (superpuesto sobre la miniatura)
    const playIconStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3em',
        color: 'white',
        textShadow: '0 0 10px rgba(0,0,0,0.8)',
    };


    const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');

    const renderMedia = () => {
        if (type === 'image') {
            return (
                <img src={url} alt={title} style={imageStyle} loading="lazy" />
            );
        }
        
        if (type === 'video' && isYoutube) {
            const videoId = getYoutubeVideoId(url);
            
            if (videoId) {
                // URL de la miniatura estándar de YouTube (Medium Quality Default)
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

                return (
                    <>
                        <img 
                            src={thumbnailUrl} 
                            alt={`Miniatura de ${title}`} 
                            style={imageStyle} 
                            loading="lazy" 
                        />
                        <span style={playIconStyle}>▶️</span>
                    </>
                );
            }
        }
        
        return <p style={{padding: '10px', color: '#A80036'}}>Video no disponible</p>;
    };


    return (
        <div 
            style={cardStyle}
            onClick={() => onClick(item)} 
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={mediaContainerStyle}>
                {renderMedia()}
            </div>
            <div style={titleStyle}>
                {type === 'image' ? '📸' : '▶️'} {title}
            </div>
        </div>
    );
};


export default function GaleriaPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    // Lógica para cargar los ítems de la galería
    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const q = query(collection(db, 'galeria'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                
                const itemsList = [];
                querySnapshot.forEach((doc) => {
                    itemsList.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setItems(itemsList);
            } catch (error) {
                console.error("Error al cargar los ítems de la galería: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryItems();
    }, []);

    if (loading) {
        return (
            <main className="main-container">
                <h1>📸 Galería de Momentos</h1>
                <p>Cargando galería...</p>
            </main>
        );
    }
    
    const galleryGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '30px',
    };


    return (
        <main className="main-container"> 
            <h1>📸 Galería de Momentos CIAC</h1>
            <p style={{marginBottom: '20px', color: '#5C001F'}}>
                Recuerdos de nuestras presentaciones y ensayos.
            </p>

            {items.length === 0 && (
                <p>Aún no hay contenido en la galería. ¡Sube tus primeras fotos y videos!</p>
            )}

            <div style={galleryGridStyle}>
                {items.map((item) => (
                    <GalleryItem 
                        key={item.id}
                        item={item}
                        onClick={setSelectedItem}
                    />
                ))}
            </div>

            <GalleryModal 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)} 
            />
        </main>
    );
}