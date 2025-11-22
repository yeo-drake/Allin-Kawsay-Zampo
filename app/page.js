// app/page.js

"use client"

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../utils/firebase'; // 1. IMPORTAMOS LA CONEXIÓN DB

import ScoreCard from './components/ScoreCard';

export default function HomePage() {
  // 2. Estado para almacenar las canciones (al principio está vacío)
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Efecto que se ejecuta solo una vez al cargar la página
  useEffect(() => {
    const fetchScores = async () => {
      try {
        // 4. Se trae la colección llamada "partituras"
        const querySnapshot = await getDocs(collection(db, 'partituras'));
        const scoresList = [];
        
        // 5. Se recorren los documentos y se extraen los datos
        querySnapshot.forEach((doc) => {
          scoresList.push({
            id: doc.id, // ID del documento
            ...doc.data(), // Todos los campos (title, rhythm, imageUrl, etc.)
          });
        });

        // 6. Se actualiza el estado de la aplicación con los datos de Firebase
        setScores(scoresList);
      } catch (error) {
        console.error("Error al cargar las partituras: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []); // El array vacío [] asegura que se ejecute solo al inicio.

  // 7. Lógica para mostrar la carga
  if (loading) {
    return (
      <main style={{ padding: '20px' }}>
        <h1>Cargando partituras desde Firebase...</h1>
        <p>Si la carga es infinita, revisa tus claves de conexión en `firebaseConfig.js`.</p>
      </main>
    );
  }

  // 8. Mostrar el contenido real
  return (
    <main style={{ padding: '20px' }}>
      <h1>🎺 Repertorio de Zampoñas (Cloud)</h1>
      <p>Lista de canciones cargadas: {scores.length} items</p>
      
      <div className="scores-list">
        {scores.map((song) => (
          <ScoreCard 
            key={song.id} 
            title={song.title} 
            rhythm={song.rhythm} 
            imageURL={song.imageUrl}
          />
        ))}
      </div>
    </main>
  );
}
