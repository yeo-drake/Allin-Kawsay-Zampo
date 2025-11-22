// app/nosotros/page.js (CÓDIGO FINAL CON NUEVA PALETA)

export default function NosotrosPage() {
    const containerStyle = {
        padding: '50px 20px',
        maxWidth: '800px',
        margin: '0 auto',
    };
    const titleStyle = {
        fontSize: '3rem',
        color: '#5C001F', // Granate Oscuro
        borderBottom: '2px solid #A80036', // Rojo Rubí
        paddingBottom: '10px',
        marginBottom: '30px',
    };
    const textStyle = {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#222222', // Negro
    };

    return (
        <main style={containerStyle}>
            <h1 style={titleStyle}>Historia del C.I.A.C. Allin Kawsay</h1>
            <p style={textStyle}>
                Aquí irá la hermosa historia de cómo se formó la Comunidad Internacional de Arte y Cultura Allin Kawsay de Juliaca, sus fundadores, sus logros y su trayectoria a través de los años. ¡Este es el espacio para que el grupo se presente al mundo!
            </p>
        </main>
    );
}