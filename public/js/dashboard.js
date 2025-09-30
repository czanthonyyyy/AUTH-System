// Dashboard Module
// Este archivo maneja la lógica del panel de usuario

// Importar funciones de autenticación
import { 
  logoutUser, 
  getUserData, 
  getCurrentUser, 
  protectRoute,
  showMessage,
  showLoading 
} from './auth.js';

/**
 * Inicializar el dashboard
 * Verificar autenticación y cargar datos del usuario
 */
export async function initDashboard() {
  try {
    // Verificar que el usuario esté autenticado
    if (!protectRoute()) {
      return;
    }

    // Mostrar estado de carga
    showLoading(true);

    // Obtener usuario actual
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('No se pudo obtener la información del usuario');
    }

    // Obtener datos adicionales del usuario desde Firestore
    const userData = await getUserData(currentUser.uid);
    
    // Mostrar información del usuario en la UI
    displayUserInfo(currentUser, userData);

    // Configurar botón de logout
    setupLogoutButton();

    console.log('✅ Dashboard inicializado correctamente');

  } catch (error) {
    console.error('Error al inicializar dashboard:', error);
    showMessage('Error al cargar el dashboard', 'error');
  } finally {
    showLoading(false);
  }
}

/**
 * Mostrar información del usuario en la interfaz
 * @param {Object} currentUser - Usuario actual de Firebase Auth
 * @param {Object} userData - Datos adicionales del usuario desde Firestore
 */
function displayUserInfo(currentUser, userData) {
  try {
    // Elementos del DOM
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const userRegistrationElement = document.getElementById('userRegistration');
    const userLastLoginElement = document.getElementById('userLastLogin');
    const welcomeMessageElement = document.getElementById('welcomeMessage');

    // Mostrar nombre del usuario
    if (userNameElement) {
      const displayName = currentUser.displayName || userData?.displayName || 'Usuario';
      userNameElement.textContent = displayName;
    }

    // Mostrar email del usuario
    if (userEmailElement) {
      userEmailElement.textContent = currentUser.email;
    }

    // Mostrar fecha de registro
    if (userRegistrationElement && userData?.createdAt) {
      const registrationDate = formatDate(userData.createdAt);
      userRegistrationElement.textContent = registrationDate;
    }

    // Mostrar último login
    if (userLastLoginElement && userData?.lastLogin) {
      const lastLoginDate = formatDate(userData.lastLogin);
      userLastLoginElement.textContent = lastLoginDate;
    }

    // Mostrar mensaje de bienvenida personalizado
    if (welcomeMessageElement) {
      const displayName = currentUser.displayName || userData?.displayName || 'Usuario';
      const timeOfDay = getTimeOfDay();
      welcomeMessageElement.textContent = `${timeOfDay}, ${displayName}!`;
    }

    // Mostrar avatar o iniciales
    displayUserAvatar(currentUser, userData);

  } catch (error) {
    console.error('Error al mostrar información del usuario:', error);
  }
}

/**
 * Mostrar avatar del usuario (iniciales si no hay foto)
 * @param {Object} currentUser - Usuario actual
 * @param {Object} userData - Datos del usuario
 */
function displayUserAvatar(currentUser, userData) {
  const avatarElement = document.getElementById('userAvatar');
  if (!avatarElement) return;

  const displayName = currentUser.displayName || userData?.displayName || 'Usuario';
  const initials = getInitials(displayName);
  
  avatarElement.textContent = initials;
  avatarElement.className = 'w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold';
}

/**
 * Obtener iniciales del nombre completo
 * @param {string} fullName - Nombre completo
 * @returns {string} Iniciales
 */
function getInitials(fullName) {
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Configurar botón de logout
 */
function setupLogoutButton() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Confirmar logout
      const confirmed = confirm('¿Estás seguro de que quieres cerrar sesión?');
      if (confirmed) {
        await logoutUser();
      }
    });
  }
}

/**
 * Formatear fecha para mostrar al usuario
 * @param {Object} timestamp - Timestamp de Firestore
 * @returns {string} Fecha formateada
 */
function formatDate(timestamp) {
  try {
    let date;
    
    // Manejar diferentes tipos de timestamp
    if (timestamp && timestamp.toDate) {
      // Timestamp de Firestore
      date = timestamp.toDate();
    } else if (timestamp && timestamp.seconds) {
      // Timestamp con formato de Firestore
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
      // Objeto Date
      date = timestamp;
    } else {
      return 'Fecha no disponible';
    }

    // Formatear fecha en español
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return 'Fecha no disponible';
  }
}

/**
 * Obtener saludo según la hora del día
 * @returns {string} Saludo apropiado
 */
function getTimeOfDay() {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Buenos días';
  } else if (hour < 18) {
    return 'Buenas tardes';
  } else {
    return 'Buenas noches';
  }
}

/**
 * Actualizar información del usuario en tiempo real
 * Esta función se puede llamar para refrescar los datos
 */
export async function refreshUserData() {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const userData = await getUserData(currentUser.uid);
    displayUserInfo(currentUser, userData);
    
    showMessage('Información actualizada', 'success');
  } catch (error) {
    console.error('Error al actualizar datos:', error);
    showMessage('Error al actualizar información', 'error');
  }
}

/**
 * Configurar eventos del dashboard
 */
export function setupDashboardEvents() {
  // Botón de actualizar información
  const refreshButton = document.getElementById('refreshButton');
  if (refreshButton) {
    refreshButton.addEventListener('click', refreshUserData);
  }

  // Configurar navegación
  setupNavigation();
}

/**
 * Configurar navegación del dashboard
 */
function setupNavigation() {
  // Agregar clase activa al elemento de navegación actual
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.includes(currentPage)) {
      item.classList.add('bg-blue-100', 'text-blue-700');
    }
  });
}

// Inicializar dashboard cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  setupDashboardEvents();
});
