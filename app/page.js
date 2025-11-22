// app/page.js (CÓDIGO FINAL DE INICIO)
    
export default function HomePage() {
    const containerStyle = {
        padding: '50px 20px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '80vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };
    
    const titleStyle = {
        fontSize: '3.5rem',
        color: '#5C001F', 
        marginBottom: '20px',
    };
    
    const subtitleStyle = {
        fontSize: '1.5rem',
        color: '#A80036', 
        marginBottom: '40px',
    };
    
    return (
        <main style={containerStyle}>
            <h1 style={titleStyle}>
                Bienvenido al Portal Oficial de C.I.A.C. Allin Kawsay Juliaca
            </h1>
            <p style={subtitleStyle}>
                Un lugar para compartir nuestra música, historia y cultura.
            </p>
            <a href="/repertorio" style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>
                Explorar el Repertorio 🎶
            </a>
        </main>
    );
}