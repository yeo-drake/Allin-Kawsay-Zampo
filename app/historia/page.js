// app/historia/page.js
"use client";

import React from 'react';

export default function HistoriaPage() {
    
    // --- Estilos ---
    const mainContainerStyle = {
        padding: '40px 20px',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'Georgia, serif',
    };

    const titleStyle = {
        color: '#5C001F',
        fontSize: '3em',
        borderBottom: '4px solid #FFD700',
        paddingBottom: '10px',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const sectionTitleStyle = {
        color: '#A80036',
        fontSize: '2em',
        marginTop: '30px',
        marginBottom: '15px',
    };

    const textStyle = {
        fontSize: '1.1em',
        lineHeight: '1.7',
        color: '#333',
        marginBottom: '20px',
    };

    const boxStyle = {
        padding: '25px',
        borderRadius: '10px',
        backgroundColor: '#FFFBEA', // Fondo claro
        borderLeft: '5px solid #FFD700',
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    };

    const boxTitleStyle = {
        color: '#5C001F',
        fontSize: '1.5em',
        marginBottom: '10px',
    };


    return (
        <main style={mainContainerStyle}>
            
            <h1 style={titleStyle}>
                📜 Nuestra Historia: C.I.A.C. Allin Kawsay
            </h1>
            
            <section style={{marginBottom: '40px'}}>
                <h2 style={sectionTitleStyle}>Fundación e Identidad</h2>
                
                <p style={textStyle}>
                    El Centro de Investigación de Arte y Cultura (C.I.A.C.) "Allin Kawsay Juliaca" nació de la necesidad de preservar y difundir las ricas tradiciones culturales del altiplano peruano. Fundado por un grupo de jóvenes apasionados, nuestro conjunto se ha consolidado como un referente de excelencia y autenticidad en la danza y música folklórica.
                </p>
                
                <p style={textStyle}>
                    A lo largo de los años, hemos llevado nuestra expresión artística a diversos escenarios nacionales e internacionales, siempre con el compromiso de representar la esencia del *Allin Kawsay* (Buen Vivir) andino a través de cada paso y cada nota musical.
                </p>
            </section>
            
            <div style={boxStyle}>
                <h3 style={boxTitleStyle}>🎯 Misión</h3>
                <p style={textStyle}>
                    Promover y revitalizar las danzas, música y costumbres ancestrales de la región Puno y del Perú, formando artistas integrales con un profundo sentido de identidad cultural y responsabilidad social.
                </p>
            </div>

            <div style={boxStyle}>
                <h3 style={boxTitleStyle}>🌟 Visión</h3>
                <p style={textStyle}>
                    Ser el conjunto de arte y cultura líder a nivel nacional e internacional, reconocido por nuestra calidad artística, innovación en la puesta en escena y por nuestro compromiso con la investigación y la enseñanza del folklore peruano.
                </p>
            </div>

            <section style={{textAlign: 'center', marginTop: '50px'}}>
                <h2 style={sectionTitleStyle}>Nuestro Compromiso</h2>
                <p style={{...textStyle, maxWidth: '700px', margin: '0 auto'}}>
                    Cada miembro del C.I.A.C. Allin Kawsay es un embajador cultural que se compromete con la disciplina, la investigación y la excelencia, honrando el legado de nuestros antepasados y asegurando que nuestra cultura perdure.
                </p>
            </section>

        </main>
    );
}
