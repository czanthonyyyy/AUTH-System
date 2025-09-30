// Firebase Configuration Module
// Este archivo contiene la configuración de Firebase y las instancias necesarias

// Importar las funciones necesarias de Firebase v9+ (modular)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyL9D8D3llStOqyLjM04EKr26XXByJw0M",
  authDomain: "auth-system-6f109.firebaseapp.com",
  projectId: "auth-system-6f109",
  storageBucket: "auth-system-6f109.firebasestorage.app",
  messagingSenderId: "917373259745",
  appId: "1:917373259745:web:dabe42ac3bd51b6573cca0",
  measurementId: "G-31ZJ02NB3X"
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar las instancias para usar en otros archivos
export { auth, db };

// Función para verificar si Firebase está configurado correctamente
export function checkFirebaseConfig() {
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(field => 
    !firebaseConfig[field] || firebaseConfig[field].includes('TU_') || firebaseConfig[field].includes('tu-')
  );
  
  if (missingFields.length > 0) {
    console.error('❌ Firebase no está configurado correctamente. Campos faltantes:', missingFields);
    console.log('📝 Por favor, actualiza firebaseConfig.js con tus credenciales de Firebase');
    return false;
  }
  
  console.log('✅ Firebase configurado correctamente');
  return true;
}
