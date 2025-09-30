# 🔐 Sistema de Autenticación con Firebase

Un sistema de autenticación completo y moderno construido con Firebase Authentication y Firestore, diseñado con las mejores prácticas de seguridad y una interfaz de usuario atractiva.

![Sistema de Autenticación](https://img.shields.io/badge/Firebase-Authentication-orange?style=for-the-badge&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility%20First-blue?style=for-the-badge&logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-red?style=for-the-badge&logo=html5)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Cómo Ejecutar](#-cómo-ejecutar)
- [Funcionalidades](#-funcionalidades)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [API y Funciones](#-api-y-funciones)
- [Próximas Mejoras](#-próximas-mejoras)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

### 🔐 Autenticación Segura
- **Registro de usuarios** con validación completa
- **Inicio de sesión** con persistencia automática
- **Cierre de sesión** seguro
- **Protección de rutas** automática
- **Manejo de errores** robusto con mensajes en español

### 🎨 Interfaz Moderna
- **Diseño responsive** que funciona en todos los dispositivos
- **TailwindCSS** para estilos modernos y consistentes
- **Animaciones suaves** y transiciones elegantes
- **Accesibilidad** completa con ARIA labels
- **Estados de carga** y feedback visual

### 🗄️ Base de Datos
- **Firestore** para almacenamiento de datos de usuario
- **Reglas de seguridad** personalizadas
- **Sincronización en tiempo real**
- **Estructura de datos** optimizada

### 🛡️ Seguridad
- **Validación frontend y backend**
- **Reglas de Firestore** restrictivas
- **Manejo seguro de credenciales**
- **Protección contra ataques comunes**

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | - | Estructura semántica y accesible |
| **TailwindCSS** | 3.x | Framework de CSS utility-first |
| **JavaScript** | ES6+ | Lógica de aplicación |
| **Firebase Auth** | v10+ | Sistema de autenticación |
| **Firestore** | v10+ | Base de datos NoSQL |
| **Firebase SDK** | Modular | Integración con servicios de Firebase |

### Dependencias Externas
- **Firebase CDN**: Para servicios de autenticación y base de datos
- **TailwindCSS CDN**: Para estilos y componentes

---

## 📁 Estructura del Proyecto

```
auth-system-firebase/
├── public/                          # Archivos públicos del sitio web
│   ├── index.html                   # Página principal (landing)
│   ├── login.html                   # Página de inicio de sesión
│   ├── signup.html                  # Página de registro
│   ├── dashboard.html               # Panel de usuario
│   ├── css/
│   │   └── styles.css              # Estilos personalizados adicionales
│   └── js/
│       ├── firebaseConfig.js       # Configuración de Firebase
│       ├── auth.js                 # Lógica de autenticación
│       └── dashboard.js            # Lógica del panel de usuario
├── config/
│   └── firebase-setup.md           # Guía de configuración de Firebase
├── README.md                       # Documentación del proyecto
└── .gitignore                      # Archivos a ignorar en Git
```

### Descripción de Archivos

#### 📄 Páginas HTML
- **`index.html`**: Página de bienvenida con información del sistema
- **`login.html`**: Formulario de inicio de sesión con validación
- **`signup.html`**: Formulario de registro con validación completa
- **`dashboard.html`**: Panel de usuario con información personal

#### 🔧 Archivos JavaScript
- **`firebaseConfig.js`**: Configuración e inicialización de Firebase
- **`auth.js`**: Funciones de autenticación y manejo de usuarios
- **`dashboard.js`**: Lógica específica del panel de usuario

#### 🎨 Archivos CSS
- **`styles.css`**: Estilos personalizados que complementan TailwindCSS

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Cuenta de Google para Firebase
- Servidor web local (Live Server, http-server, etc.)

### Paso 1: Clonar/Descargar el Proyecto
```bash
# Si usas Git
git clone https://github.com/tu-usuario/auth-system-firebase.git
cd auth-system-firebase

# O simplemente descarga y extrae el ZIP
```

### Paso 2: Configurar Firebase
1. Sigue la guía detallada en [`config/firebase-setup.md`](config/firebase-setup.md)
2. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
3. Habilita Authentication (Email/Password)
4. Crea una base de datos Firestore
5. Copia las credenciales de configuración

### Paso 3: Actualizar Configuración
1. Abre `public/js/firebaseConfig.js`
2. Reemplaza el objeto `firebaseConfig` con tus credenciales:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-aqui",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Paso 4: Configurar Reglas de Firestore
En Firebase Console > Firestore > Reglas, usa estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🏃‍♂️ Cómo Ejecutar

### Opción 1: Live Server (Recomendado)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `public/index.html`
3. Selecciona "Open with Live Server"
4. El sitio se abrirá en `http://127.0.0.1:5500`

### Opción 2: http-server (Node.js)
```bash
# Instalar http-server globalmente
npm install -g http-server

# Navegar a la carpeta public
cd public

# Ejecutar servidor
http-server -p 8080

# Abrir http://localhost:8080
```

### Opción 3: Python Simple Server
```bash
# Navegar a la carpeta public
cd public

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Abrir http://localhost:8000
```

### Opción 4: Cualquier Servidor Web
Puedes usar cualquier servidor web local que sirva archivos estáticos desde la carpeta `public`.

---

## 🎯 Funcionalidades

### ✅ Implementadas

#### 🔐 Sistema de Autenticación
- [x] **Registro de usuario** con email, contraseña y nombre completo
- [x] **Inicio de sesión** con email y contraseña
- [x] **Cierre de sesión** seguro
- [x] **Persistencia de sesión** automática
- [x] **Protección de rutas** (redirige a login si no está autenticado)
- [x] **Validación de formularios** en tiempo real
- [x] **Manejo de errores** con mensajes en español

#### 🗄️ Integración con Firestore
- [x] **Crear documento de usuario** al registrarse
- [x] **Actualizar último login** en cada sesión
- [x] **Mostrar datos del usuario** en el dashboard
- [x] **Reglas de seguridad** para proteger datos

#### 🎨 Interfaz de Usuario
- [x] **Diseño responsive** para móvil, tablet y desktop
- [x] **Animaciones suaves** y transiciones
- [x] **Estados de carga** durante operaciones
- [x] **Mensajes de feedback** para el usuario
- [x] **Validación visual** de formularios
- [x] **Accesibilidad** con ARIA labels

#### 🛡️ Seguridad
- [x] **Validación frontend** de todos los campos
- [x] **Reglas de Firestore** restrictivas
- [x] **Manejo seguro de errores**
- [x] **Protección contra inyección**

### 🔄 En Desarrollo (Próximas Mejoras)
- [ ] **Recuperación de contraseña** por email
- [ ] **Verificación de email** antes del registro
- [ ] **Autenticación con Google** (OAuth)
- [ ] **Autenticación con Facebook** (OAuth)
- [ ] **Autenticación con GitHub** (OAuth)
- [ ] **Cambio de contraseña** desde el dashboard
- [ ] **Eliminación de cuenta** con confirmación
- [ ] **Perfil de usuario** editable
- [ ] **Historial de sesiones**
- [ ] **Notificaciones push**

---

## 📸 Capturas de Pantalla

### 🏠 Página Principal (index.html)
- **Header**: Logo del sistema y navegación
- **Hero Section**: Título principal con botones de acción
- **Features**: Tarjetas con características del sistema
- **Technology Stack**: Iconos de tecnologías utilizadas
- **Footer**: Información de copyright

### 📝 Página de Registro (signup.html)
- **Formulario**: Nombre completo, email, contraseña y confirmación
- **Validación**: Mensajes de error en tiempo real
- **Toggle de contraseña**: Botón para mostrar/ocultar contraseña
- **Términos**: Checkbox de aceptación de términos
- **Enlaces**: Link a página de login

### 🔑 Página de Login (login.html)
- **Formulario**: Email y contraseña
- **Recordarme**: Checkbox para persistencia de sesión
- **Recuperación**: Link para recuperar contraseña
- **Social Auth**: Botones para Google y Facebook (placeholder)
- **Enlaces**: Link a página de registro

### 📊 Dashboard (dashboard.html)
- **Welcome**: Mensaje personalizado con avatar
- **Información Personal**: Nombre y email del usuario
- **Información de Cuenta**: Fecha de registro y último acceso
- **Estadísticas**: Estado de cuenta y nivel de seguridad
- **Acciones Rápidas**: Botones para funciones futuras
- **Consejos de Seguridad**: Tips importantes para el usuario

---

## 🔧 API y Funciones

### 📄 firebaseConfig.js
```javascript
// Configuración de Firebase
export { auth, db, checkFirebaseConfig }

// Verificar configuración
checkFirebaseConfig() // boolean
```

### 🔐 auth.js
```javascript
// Funciones principales
registerUser(email, password, fullName) // Promise
loginUser(email, password) // Promise
logoutUser() // Promise
getUserData(uid) // Promise<Object>
isUserAuthenticated() // boolean
getCurrentUser() // Object|null

// Utilidades
showMessage(message, type) // void
hideMessage() // void
showLoading(show) // void
protectRoute(redirectTo) // boolean
redirectIfAuthenticated(redirectTo) // boolean
```

### 📊 dashboard.js
```javascript
// Funciones principales
initDashboard() // Promise
refreshUserData() // Promise
setupDashboardEvents() // void

// Utilidades internas
displayUserInfo(currentUser, userData) // void
formatDate(timestamp) // string
getTimeOfDay() // string
```

---

## 🚀 Próximas Mejoras

### 🔐 Autenticación Avanzada
- **Recuperación de contraseña**: Envío de email con link de reset
- **Verificación de email**: Confirmación obligatoria antes del acceso
- **Autenticación social**: Google, Facebook, GitHub, Twitter
- **Autenticación de dos factores**: 2FA con SMS o app authenticator
- **Sesiones múltiples**: Gestión de dispositivos conectados

### 👤 Gestión de Usuario
- **Perfil editable**: Cambiar nombre, email, foto de perfil
- **Cambio de contraseña**: Desde el dashboard con validación
- **Eliminación de cuenta**: Con confirmación y limpieza de datos
- **Historial de actividad**: Log de accesos y acciones
- **Preferencias**: Configuración de notificaciones y privacidad

### 🎨 Mejoras de UI/UX
- **Tema oscuro**: Modo oscuro/claro con persistencia
- **Internacionalización**: Soporte para múltiples idiomas
- **Notificaciones**: Sistema de notificaciones en tiempo real
- **Animaciones avanzadas**: Micro-interacciones y transiciones
- **PWA**: Convertir en Progressive Web App

### 🛡️ Seguridad Avanzada
- **Rate limiting**: Límite de intentos de login
- **Detección de anomalías**: Alertas por actividad sospechosa
- **Auditoría**: Log completo de acciones de seguridad
- **Encriptación**: Datos sensibles encriptados
- **CSP**: Content Security Policy headers

### 📱 Funcionalidades Móviles
- **App móvil**: Versión nativa con React Native
- **Notificaciones push**: Alertas en dispositivos móviles
- **Biometría**: Login con huella dactilar o Face ID
- **Offline**: Funcionalidad básica sin conexión

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

### 🐛 Reportar Bugs
1. Ve a la pestaña "Issues"
2. Haz clic en "New Issue"
3. Selecciona "Bug report"
4. Describe el problema detalladamente

### ✨ Sugerir Mejoras
1. Ve a la pestaña "Issues"
2. Haz clic en "New Issue"
3. Selecciona "Feature request"
4. Describe tu idea con ejemplos

### 🔧 Contribuir Código
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### 📋 Guías de Contribución
- Sigue las convenciones de código existentes
- Agrega comentarios para código complejo
- Actualiza la documentación si es necesario
- Prueba tus cambios antes de enviar

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2024 Sistema de Autenticación

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 **Email**: tu-email@ejemplo.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/tu-usuario/auth-system-firebase/issues)
- 📖 **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/auth-system-firebase/wiki)
- 💬 **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/auth-system-firebase/discussions)

---

## 🙏 Agradecimientos

- **Firebase Team** por la excelente plataforma
- **TailwindCSS** por el increíble framework de CSS
- **Comunidad de desarrolladores** por las contribuciones y feedback
- **Contribuidores** que han ayudado a mejorar este proyecto

---

<div align="center">

**⭐ Si este proyecto te ha sido útil, ¡dale una estrella! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/tu-usuario/auth-system-firebase?style=social)](https://github.com/tu-usuario/auth-system-firebase)
[![GitHub forks](https://img.shields.io/github/forks/tu-usuario/auth-system-firebase?style=social)](https://github.com/tu-usuario/auth-system-firebase)

</div>
