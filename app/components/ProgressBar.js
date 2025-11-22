// app/components/ProgressBar.js (CÓDIGO FINAL CON COLOR Y ALTURA AJUSTADOS)
"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function AppProgress() {
  return (
    <ProgressBar
      height="6px" // Altura aumentada de 4px a 6px
      color="#A80036" // Color Rojo Rubí/Granate
      options={{ showSpinner: false }} 
      shallowRouting 
    />
  );
}