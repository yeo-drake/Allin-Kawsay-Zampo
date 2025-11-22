// app/repertorio/page.js (CÓDIGO FINAL CON BARRA DE BÚSQUEDA Y FILTRADO)
"use client";

import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../utils/firebase'; 

import ScoreCard from '../components/ScoreCard';
import ScoreModal from '../components/ScoreModal';

export default function RepertorioPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScore, setSelectedScore] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); // <-- NUEVO: Estado para el término de búsqueda

  // 1. Lógica para cargar las partituras (SIN CAMBIOS)
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

  // 2. Lógica para filtrar las partituras
  const filteredScores = useMemo(() => {
    if (!searchTerm) {
      return scores;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return scores.filter(score => {
      // Filtra por Título O por Ritmo
      return (
        score.title.toLowerCase().includes(lowerCaseSearch) ||
        score.rhythm.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }, [scores, searchTerm]); // Se recalcula cuando cambian las canciones o el término de búsqueda

  // Funciones del Modal (SIN CAMBIOS)
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

  // --- Estilos para la Barra de Búsqueda (Se podría mover a globals.css) ---
  const searchInputStyle = {
    width: '100%',
    padding: '12px 20px',
    margin: '20px 0 30px 0',
    borderRadius: '8px',
    border: '2px solid #A80036', // Rojo Rubí
    fontSize: '1.1em',
    outline: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s',
  };


  return (
    <main className="main-container"> 
      <h1>🎺 Repertorio de C.I.A.C. Allin Kawsay</h1>
      <p>Lista de canciones cargadas: {scores.length} items</p>
      
      {/* BARRA DE BÚSQUEDA */}
      <input
        type="text"
        placeholder="Buscar por Título o Ritmo..."
        style={searchInputStyle}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* MENSAJE DE RESULTADOS */}
      <p style={{marginBottom: '20px', color: '#5C001F'}}>
          Mostrando {filteredScores.length} resultado(s).
      </p>

      {/* LISTA DE PARTITURAS (USANDO filteredScores) */}
      <div className="scores-list">
        {filteredScores.map((song) => (
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