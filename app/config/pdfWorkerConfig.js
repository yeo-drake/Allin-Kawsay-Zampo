// app/config/pdfWorkerConfig.js - NUEVA VERSIÓN

import { pdfjs } from 'react-pdf';

// 🛑 IMPORTANTE: Usamos la función import() de Webpack para obtener 
// la URL correcta del worker que ha sido copiado a la carpeta 'public'.
// Esto resuelve el problema de timing y la ruta absoluta.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

console.log("PDF Worker configurado usando import.meta.url para Next.js.");