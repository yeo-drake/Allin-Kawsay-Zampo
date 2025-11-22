// app/page.js (CÓDIGO COMPLETO Y FINAL)
"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../utils/firebase'; 

import ScoreCard from './components/ScoreCard';

export default function HomePage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'partituras'));
        const scoresList = [];
        
        querySnapshot.forEach((doc) => {
          scoresList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setScores(scoresList);
      } catch (error) {
        console.error("Error al cargar las partituras: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <main className="main-container">
        <h1>Cargando repertorio...</h1>
      </main>
    );
  }

  return (
    // ¡Añadimos la clase main-container aquí!
    <main className="main-container"> 
      <h1>🎺 Repertorio de Zampoñas</h1>
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
