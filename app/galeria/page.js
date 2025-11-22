// app/galeria/page.js (CÓDIGO FINAL CON NUEVA PALETA)

export default function GaleriaPage() {
    const containerStyle = {
        padding: '50px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
    };
    const titleStyle = {
        fontSize: '3rem',
        color: '#5C001F', // Granate Oscuro
        borderBottom: '2px solid #A80036', // Rojo Rubí
        paddingBottom: '10px',
        marginBottom: '30px',
        textAlign: 'center',
    };

    return (
        <main style={containerStyle}>
            <h1 style={titleStyle}>📷 Galería ALLIN KAWSAY</h1>
            <p style={{ textAlign: 'center', color: '#222222', fontSize: '1.2rem' }}>
                Aquí mostraremos los álbumes de fotos de nuestros eventos y enlaces de descarga de alta calidad.
            </p>
        </main>
    );
}
