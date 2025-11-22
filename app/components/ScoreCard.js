// app/components/ScoreCard.js (CÓDIGO COMPLETO Y FINAL)

export default function ScoreCard({ title, rhythm, imageURL }) {
  // Estilos CSS incrustados para la tarjeta
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', 
    overflow: 'hidden', 
    transition: 'transform 0.3s, box-shadow 0.3s', 
    cursor: 'pointer',
    border: '1px solid #E94F3A', /* Borde de terracota */
  };

  // Nuevo estilo para la cabecera de la tarjeta
  const headerStyle = {
    backgroundColor: '#E94F3A', /* Fondo de terracota */
    color: '#FFFFFF', /* Texto blanco */
    padding: '12px 20px',
    margin: 0, 
    fontSize: '1.4em',
    fontWeight: 'bold',
  };

  // Efecto visual al pasar el mouse por encima
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
  };

  // Estilos para la imagen
  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover', 
  };

  // Estilos para el texto interior
  const contentStyle = {
    padding: '20px',
  };

  // Estilo Andino vibrante para el ritmo
  const rhythmStyle = {
    color: '#4A235A', /* Púrpura oscuro */
    fontWeight: '600',
    fontSize: '0.95em',
    marginTop: '5px',
    textTransform: 'uppercase',
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(imageURL, '_blank')} // Abre la imagen o URL en una nueva pestaña
    >
      
      {/* 1. TÍTULO EN CABECERA DE COLOR */}
      <div style={headerStyle}>
          {title}
      </div>

      {/* 2. IMAGEN */}
      <img 
        src={imageURL || 'https://via.placeholder.com/600x400.png?text=Partitura+no+disponible'} 
        alt={`Partitura de ${title}`} 
        style={imageStyle} 
      />
      
      {/* 3. CONTENIDO Y RITMO */}
      <div style={contentStyle}>
        <p style={rhythmStyle}>
          Ritmo: {rhythm}
        </p>
      </div>
    </div>
  );
}
