// app/components/ScoreCard.js

export default function ScoreCard({ title, rhythm, imageURL }) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '15px', 
      margin: '10px 0',
      borderRadius: '8px',
      maxWidth: '350px'
    }}>
      <h2>{title}</h2>
      <p>Ritmo: {rhythm}</p> 
      
      <img 
        src={imageURL} 
        alt={`Partitura de ${title}`} 
        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
      />
      <button style={{ 
        backgroundColor: 'darkblue', 
        color: 'white', 
        padding: '10px', 
        border: 'none',
        borderRadius: '5px',
        marginTop: '10px'
      }}>
        Escuchar Guía
      </button>
    </div>
  );
}