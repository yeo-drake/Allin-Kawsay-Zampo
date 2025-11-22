// utils/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig'; // Importamos las claves que creaste

// 1. Inicializar Firebase con tus claves
const app = initializeApp(firebaseConfig);

// 2. Obtener una referencia a la base de datos Firestore
export const db = getFirestore(app);

// Este archivo simplemente se asegura de que la conexión esté lista.