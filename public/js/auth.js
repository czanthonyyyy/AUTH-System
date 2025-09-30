// Authentication Module
// Este archivo maneja toda la lógica de autenticación con Firebase

// Importar funciones de Firebase Auth
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Importar funciones de Firestore
import { 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc,
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Importar configuración de Firebase
import { auth, db, checkFirebaseConfig } from './firebaseConfig.js';

// Verificar configuración al cargar
checkFirebaseConfig();

// Elementos del DOM para mostrar mensajes
let messageElement = null;

/**
 * Inicializar el sistema de autenticación
 * Configura el observer de estado de autenticación
 */
export function initAuth() {
  // Observer para cambios en el estado de autenticación
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('✅ Usuario autenticado:', user.email);
      // Actualizar último login en Firestore
      updateLastLogin(user.uid);
    } else {
      console.log('❌ Usuario no autenticado');
    }
  });
}

/**
 * Registrar un nuevo usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} fullName - Nombre completo del usuario
 */
export async function registerUser(email, password, fullName) {
  try {
    showLoading(true);
    hideMessage();

    // Validaciones del frontend
    if (!email || !password || !fullName) {
      throw new Error('Todos los campos son obligatorios');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (!isValidEmail(email)) {
      throw new Error('Por favor, ingresa un email válido');
    }

    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualizar el perfil del usuario con el nombre completo
    await updateProfile(user, {
      displayName: fullName
    });

    // Guardar datos adicionales en Firestore
    await saveUserToFirestore(user, fullName);

    showMessage('¡Registro exitoso! Redirigiendo al inicio...', 'success');
    
    // Redirigir al index después de 2 segundos
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);

  } catch (error) {
    console.error('Error en registro:', error);
    const errorMessage = getErrorMessage(error.code);
    showMessage(errorMessage, 'error');
  } finally {
    showLoading(false);
  }
}

/**
 * Iniciar sesión de usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 */
export async function loginUser(email, password) {
  try {
    showLoading(true);
    hideMessage();

    // Validaciones del frontend
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    if (!isValidEmail(email)) {
      throw new Error('Por favor, ingresa un email válido');
    }

    // Iniciar sesión con Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    showMessage('¡Inicio de sesión exitoso! Redirigiendo al inicio...', 'success');
    
    // Redirigir al index después de 1.5 segundos
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);

  } catch (error) {
    console.error('Error en login:', error);
    const errorMessage = getErrorMessage(error.code);
    showMessage(errorMessage, 'error');
  } finally {
    showLoading(false);
  }
}

/**
 * Cerrar sesión del usuario
 */
export async function logoutUser() {
  try {
    showLoading(true);
    
    await signOut(auth);
    
    showMessage('Sesión cerrada correctamente', 'success');
    
    // Redirigir al index después de 1 segundo
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);

  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    showMessage('Error al cerrar sesión', 'error');
  } finally {
    showLoading(false);
  }
}

/**
 * Guardar datos del usuario en Firestore
 * @param {Object} user - Usuario de Firebase Auth
 * @param {string} fullName - Nombre completo del usuario
 */
async function saveUserToFirestore(user, fullName) {
  try {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: fullName,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    console.log('✅ Usuario guardado en Firestore');
  } catch (error) {
    console.error('Error al guardar usuario en Firestore:', error);
    throw error;
  }
}

/**
 * Actualizar último login en Firestore
 * @param {string} uid - ID del usuario
 */
async function updateLastLogin(uid) {
  try {
    await updateDoc(doc(db, 'users', uid), {
      lastLogin: serverTimestamp()
    });
  } catch (error) {
    console.error('Error al actualizar último login:', error);
  }
}

/**
 * Obtener datos del usuario desde Firestore
 * @param {string} uid - ID del usuario
 * @returns {Object} Datos del usuario
 */
export async function getUserData(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('Usuario no encontrado en la base de datos');
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
}

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean} True si está autenticado
 */
export function isUserAuthenticated() {
  return auth.currentUser !== null;
}

/**
 * Obtener usuario actual
 * @returns {Object|null} Usuario actual o null
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Validar formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Convertir códigos de error de Firebase a mensajes en español
 * @param {string} errorCode - Código de error de Firebase
 * @returns {string} Mensaje de error en español
 */
function getErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'Este email ya está registrado',
    'auth/invalid-email': 'Email inválido',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/weak-password': 'La contraseña es muy débil',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/user-not-found': 'No existe una cuenta con este email',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
    'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
  };

  return errorMessages[errorCode] || 'Ha ocurrido un error inesperado';
}

/**
 * Mostrar mensaje al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje (success, error, info)
 */
export function showMessage(message, type = 'info') {
  // Buscar elemento de mensaje existente
  messageElement = document.getElementById('message');
  
  if (!messageElement) {
    // Crear elemento de mensaje si no existe
    messageElement = document.createElement('div');
    messageElement.id = 'message';
    messageElement.className = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm';
    
    // Insertar después del primer elemento del body
    const firstElement = document.body.firstElementChild;
    if (firstElement) {
      document.body.insertBefore(messageElement, firstElement);
    } else {
      document.body.appendChild(messageElement);
    }
  }

  // Configurar clases según el tipo
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  messageElement.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${typeClasses[type]}`;
  messageElement.textContent = message;
  messageElement.style.display = 'block';

  // Auto-ocultar después de 5 segundos
  setTimeout(() => {
    hideMessage();
  }, 5000);
}

/**
 * Ocultar mensaje
 */
export function hideMessage() {
  if (messageElement) {
    messageElement.style.display = 'none';
  }
}

/**
 * Mostrar/ocultar estado de carga
 * @param {boolean} show - Mostrar u ocultar
 */
export function showLoading(show) {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = show ? 'block' : 'none';
  }
}

/**
 * Proteger rutas - redirigir a login si no está autenticado
 * @param {string} redirectTo - Página a la que redirigir si no está autenticado
 */
export function protectRoute(redirectTo = 'login.html') {
  if (!isUserAuthenticated()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

/**
 * Redirigir si ya está autenticado (para páginas de login/signup)
 * @param {string} redirectTo - Página a la que redirigir si ya está autenticado
 */
export function redirectIfAuthenticated(redirectTo = 'dashboard.html') {
  if (isUserAuthenticated()) {
    window.location.href = redirectTo;
    return true;
  }
  return false;
}
