// app/components/ScoreCard.js (CÓDIGO FINAL Y CORREGIDO)

export default function ScoreCard({ title, rhythm, imageURL, guideUrl, onClick }) { 
  
  // --- Estilos CSS ---
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', 
    overflow: 'hidden', 
    transition: 'transform 0.3s, box-shadow 0.3s', 
    cursor: 'pointer', 
    border: '1px solid #A80036', 
  };

  const headerStyle = {
    backgroundColor: '#A80036', 
    color: '#FFD700', 
    padding: '12px 20px',
    margin: 0, 
    fontSize: '1.4em',
    fontWeight: 'bold',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover', 
  };

  const contentStyle = {
    padding: '20px',
  };

  const rhythmStyle = {
    color: '#5C001F', 
    fontWeight: '600',
    fontSize: '0.95em',
    marginTop: '5px',
    textTransform: 'uppercase',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      
      <div style={headerStyle}>
          {title}
      </div>

      <img 
        src={imageURL || 'https://via.placeholder.com/600x400.png?text=Partitura+no+disponible'} 
        alt={`Partitura de ${title}`} 
        style={imageStyle} 
      />
      
      <div style={contentStyle}>
        <p style={rhythmStyle}>
          Ritmo: {rhythm}
        </p>
      </div>
    </div>
  );
}