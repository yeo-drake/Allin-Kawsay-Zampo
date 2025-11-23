// app/repertorio/page.js (CÓDIGO FINAL VERIFICADO CON LÓGICA DE ÍNDICE Y VISTAS COMPACTAS)
"use client";

import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../utils/firebase'; 

import ScoreCard from '../components/ScoreCard';
import ScoreModal from '../components/ScoreModal';
import ViewToggle from '../components/ViewToggle';
import ScoreIndexModal from '../components/ScoreIndexModal'; 

export default function RepertorioPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScore, setSelectedScore] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  
  // Vista inicial configurada en 'list' por preferencia
  const [viewMode, setViewMode] = useState('list');
  
  // ESTADOS para control de la lista
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [sortOption, setSortOption] = useState('title-asc'); 
  const [filterRhythm, setFilterRhythm] = useState('all'); 
  const [showFavorites, setShowFavorites] = useState(false); 

  const [toggleFavoriteTrigger, setToggleFavoriteTrigger] = useState(0);

  // 1. Lógica para cargar las partituras
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'partituras'));
        const scoresList = [];
        
        querySnapshot.forEach((doc) => {
          scoresList.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : new Date(0), 
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
  
  const handleToggleFavorite = () => {
    setToggleFavoriteTrigger(prev => prev + 1); 
  };


  // 2. Lógica para filtrar y ordenar las partituras (COMBINADO)
  const filteredAndSortedScores = useMemo(() => {
    let currentScores = [...scores];
    
    const favorites = JSON.parse(localStorage.getItem('ciac_favorites') || '[]');

    if (showFavorites) {
        currentScores = currentScores.filter(score => favorites.includes(score.id));
    }

    if (filterRhythm !== 'all') {
      currentScores = currentScores.filter(score => 
        score.rhythm.toLowerCase() === filterRhythm.toLowerCase()
      );
    }
    
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      currentScores = currentScores.filter(score =>
        score.title.toLowerCase().includes(lowerCaseSearch) ||
        score.rhythm.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    currentScores.sort((a, b) => {
      if (sortOption === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortOption === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sortOption === 'rhythm-asc') {
        return a.rhythm.localeCompare(b.rhythm);
      }
      if (sortOption === 'newest') {
        return b.timestamp.getTime() - a.timestamp.getTime(); 
      }
      return 0;
    });
    
    return currentScores;
  }, [scores, searchTerm, filterRhythm, sortOption, showFavorites, toggleFavoriteTrigger]); 

  // Extraer todos los ritmos únicos para el filtro
  const uniqueRhythms = useMemo(() => {
    const rhythms = scores.map(score => score.rhythm).filter(Boolean); 
    const unique = [...new Set(rhythms)];
    return unique.sort((a, b) => a.localeCompare(b));
  }, [scores]);


  // Funciones del Modal (sin cambios)
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
  
  // --- Estilos para los Inputs ---
  const controlContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap', 
  };
  
  const selectStyle = {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-card-bg)',
    color: 'var(--color-text)',
    fontSize: '1em',
    cursor: 'pointer',
    flexGrow: 1,
    minWidth: '150px'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '12px 20px',
    margin: '20px 0 10px 0', 
    borderRadius: '8px',
    border: '2px solid var(--color-border)', 
    fontSize: '1.1em',
    outline: 'none',
    boxShadow: '0 4px 6px var(--shadow-color)',
    transition: 'border-color 0.3s',
    backgroundColor: 'var(--color-card-bg)',
    color: 'var(--color-text)',
  };


  return (
    <main className="main-container"> 
      <h1>🎺 Repertorio de C.I.A.C. Allin Kawsay</h1>
      
      {/* BARRA DE BÚSQUEDA */}
      <input
        type="text"
        placeholder="Buscar por Título o Ritmo..."
        style={searchInputStyle}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* CONTROLES DE ORDENAMIENTO, RITMO Y FAVORITOS */}
      <div style={controlContainerStyle}>
          
          {/* CONTROL DE ORDENAMIENTO (SORTING) */}
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)} 
            style={selectStyle}
          >
            <option value="title-asc">Ordenar: Título (A-Z)</option>
            <option value="title-desc">Ordenar: Título (Z-A)</option>
            <option value="rhythm-asc">Ordenar: Ritmo</option>
            <option value="newest">Ordenar: Más Reciente</option>
          </select>
          
          {/* CONTROL DE FILTRO POR RITMO */}
          <select 
            value={filterRhythm} 
            onChange={(e) => setFilterRhythm(e.target.value)} 
            style={selectStyle}
          >
            <option value="all">Filtrar: Todos los Ritmos</option>
            {uniqueRhythms.map(rhythm => (
                <option key={rhythm} value={rhythm.toLowerCase()}>{rhythm}</option>
            ))}
          </select>

          {/* BOTÓN DE FILTRO DE FAVORITOS */}
          <button
              onClick={() => setShowFavorites(!showFavorites)}
              style={{
                  ...selectStyle,
                  backgroundColor: showFavorites ? 'var(--color-secondary)' : 'var(--color-card-bg)',
                  color: showFavorites ? 'var(--color-primary)' : 'var(--color-text)',
                  border: showFavorites ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  fontWeight: showFavorites ? 'bold' : 'normal',
                  flexGrow: 1,
              }}
          >
              {showFavorites ? '★ Mostrando Favoritos' : '☆ Mostrar Solo Favoritos'}
          </button>
      </div> 


      {/* ALTERNADOR DE VISTA: Listado y Cuadrícula */}
      <ViewToggle 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          allowedViews={['list', 'grid']} 
      /> 

      {/* BOTÓN DE ÍNDICE */}
      <button
          onClick={() => setIsIndexOpen(true)}
          style={{
              ...selectStyle,
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '20px',
              maxWidth: '300px',
          }}
      >
          📖 Ver Índice Completo (Total: {scores.length})
      </button>

      {/* MENSAJE DE RESULTADOS */}
      <p style={{marginBottom: '20px', color: 'var(--color-text)'}}>
          Mostrando {filteredAndSortedScores.length} resultado(s) de {scores.length}.
      </p>

      {/* LISTA DE PARTITURAS */}
      <div className={`scores-list scores-list-${viewMode}`}>
        {filteredAndSortedScores.map((song) => (
          <ScoreCard 
            key={song.id} 
            title={song.title} 
            rhythm={song.rhythm} 
            imageURL={song.imageUrl} 
            guideUrl={song.guideUrl} 
            onClick={() => openModal(song)}
            viewMode={viewMode}
            scoreId={song.id}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <ScoreModal score={selectedScore} onClose={closeModal} />
      
      {/* MODAL DE ÍNDICE */}
      <ScoreIndexModal 
          isOpen={isIndexOpen}
          onClose={() => setIsIndexOpen(false)}
          scores={scores} 
          openScoreModal={openModal} 
      />

    </main>
  );
}