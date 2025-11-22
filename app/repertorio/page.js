// app/repertorio/page.js (CÓDIGO FINAL Y CORREGIDO)
"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../utils/firebase'; 

import ScoreCard from '../components/ScoreCard';
import ScoreModal from '../components/ScoreModal';

export default function RepertorioPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScore, setSelectedScore] = useState(null); 

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

  const openModal = (score) => {
    setSelectedScore(score);
  };

  const closeModal = () => {
    setSelectedScore(null);
  };

  if (loading) {
    return (
      <main className="main-container">
        <h1>Cargando repertorio...</h1>
      </main>
    );
  }

  return (
    <main className="main-container"> 
      <h1>🎺 Repertorio de C.I.A.C. Allin Kawsay</h1>
      <p>Lista de canciones cargadas: {scores.length} items</p>
      
      <div className="scores-list">
        {scores.map((song) => (
          <ScoreCard 
            key={song.id} 
            title={song.title} 
            rhythm={song.rhythm} 
            imageURL={song.imageUrl}
            guideUrl={song.guideUrl} 
            onClick={() => openModal(song)}
          />
        ))}
      </div>

      <ScoreModal score={selectedScore} onClose={closeModal} />
    </main>
  );
}