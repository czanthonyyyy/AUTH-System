# 🔥 Guía de Configuración de Firebase

Esta guía te ayudará a configurar Firebase para el Sistema de Autenticación paso a paso.

## 📋 Tabla de Contenidos

1. [Crear Proyecto en Firebase](#crear-proyecto-en-firebase)
2. [Habilitar Authentication](#habilitar-authentication)
3. [Configurar Firestore Database](#configurar-firestore-database)
4. [Obtener Credenciales](#obtener-credenciales)
5. [Configurar Reglas de Seguridad](#configurar-reglas-de-seguridad)
6. [Verificar Configuración](#verificar-configuración)

---

## 🚀 Crear Proyecto en Firebase

### Paso 1: Acceder a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Crear un proyecto"** o **"Add project"**

### Paso 2: Configurar el Proyecto
1. **Nombre del proyecto**: Ingresa un nombre descriptivo (ej: `auth-system-app`)
2. **Google Analytics**: Puedes habilitarlo o deshabilitarlo según tus necesidades
3. Haz clic en **"Crear proyecto"**
4. Espera a que se complete la configuración

### Paso 3: Configurar el Proyecto
1. Una vez creado, haz clic en **"Continuar"**
2. Serás redirigido al panel principal de Firebase

---

## 🔐 Habilitar Authentication

### Paso 1: Ir a Authentication
1. En el panel lateral izquierdo, haz clic en **"Authentication"**
2. Haz clic en **"Comenzar"** o **"Get started"**

### Paso 2: Configurar Métodos de Autenticación
1. Ve a la pestaña **"Sign-in method"**
2. Haz clic en **"Email/Password"**
3. **Habilita** el primer toggle (Email/Password)
4. **Opcional**: Habilita el segundo toggle si quieres permitir registro con email no verificado
5. Haz clic en **"Guardar"**

### Paso 3: Configurar Dominios Autorizados
1. Ve a la pestaña **"Settings"**
2. En **"Authorized domains"**, asegúrate de que estén incluidos:
   - `localhost` (para desarrollo local)
   - Tu dominio de producción (cuando lo tengas)

---

## 🗄️ Configurar Firestore Database

### Paso 1: Crear Base de Datos
1. En el panel lateral, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Iniciar en modo de prueba"** (cambiarás las reglas después)
4. Elige la ubicación más cercana a tus usuarios
5. Haz clic en **"Siguiente"** y luego **"Habilitar"**

### Paso 2: Verificar la Base de Datos
1. Deberías ver la interfaz de Firestore Database
2. Por ahora estará vacía, pero se llenará cuando los usuarios se registren

---

## 🔑 Obtener Credenciales

### Paso 1: Ir a Configuración del Proyecto
1. Haz clic en el ícono de **configuración** (⚙️) junto a "Descripción general del proyecto"
2. Selecciona **"Configuración del proyecto"**

### Paso 2: Obtener Configuración Web
1. Desplázate hacia abajo hasta **"Tus aplicaciones"**
2. Haz clic en el ícono **"</>"** (Web)
3. Ingresa un nombre para tu app (ej: `auth-system-web`)
4. **NO** marques "También configura Firebase Hosting" por ahora
5. Haz clic en **"Registrar app"**

### Paso 3: Copiar la Configuración
1. Se mostrará un objeto de configuración como este:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

2. **Copia este objeto completo**
3. Haz clic en **"Continuar en la consola"**

### Paso 4: Actualizar firebaseConfig.js
1. Abre el archivo `public/js/firebaseConfig.js`
2. Reemplaza el objeto `firebaseConfig` con el que copiaste
3. **IMPORTANTE**: Mantén las comillas y la estructura exacta

---

## 🛡️ Configurar Reglas de Seguridad

### Paso 1: Ir a Reglas de Firestore
1. En Firestore Database, ve a la pestaña **"Reglas"**
2. Reemplaza las reglas existentes con estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para la colección de usuarios
    match /users/{userId} {
      // Solo permite lectura y escritura si el usuario está autenticado
      // y el userId coincide con el UID del usuario autenticado
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Reglas para otras colecciones (si las agregas en el futuro)
    match /{document=**} {
      // Por defecto, denegar acceso a cualquier otra colección
      allow read, write: if false;
    }
  }
}
```

### Paso 2: Publicar las Reglas
1. Haz clic en **"Publicar"**
2. Confirma la acción

### Paso 3: Explicación de las Reglas
- **`request.auth != null`**: Verifica que el usuario esté autenticado
- **`request.auth.uid == userId`**: Verifica que el usuario solo pueda acceder a sus propios datos
- **`match /{document=**}`**: Regla catch-all que deniega acceso a cualquier otra colección

---

## ✅ Verificar Configuración

### Paso 1: Verificar Authentication
1. Ve a **Authentication > Users**
2. Debería estar vacío inicialmente
3. Los usuarios aparecerán aquí cuando se registren

### Paso 2: Verificar Firestore
1. Ve a **Firestore Database > Data**
2. Debería estar vacío inicialmente
3. Se creará la colección `users` cuando alguien se registre

### Paso 3: Probar la Configuración
1. Abre `public/index.html` en tu navegador
2. Intenta registrarte con un email de prueba
3. Si todo funciona, deberías ver:
   - El usuario en Authentication > Users
   - Un documento en Firestore > Data > users

---

## 🔧 Configuración Adicional (Opcional)

### Configurar Dominios Personalizados
Si planeas usar un dominio personalizado:

1. Ve a **Authentication > Settings > Authorized domains**
2. Haz clic en **"Agregar dominio"**
3. Ingresa tu dominio (ej: `miapp.com`)

### Configurar Email Templates
1. Ve a **Authentication > Templates**
2. Personaliza los emails de:
   - Verificación de email
   - Recuperación de contraseña
   - Cambio de email

### Configurar Configuración Regional
1. Ve a **Project Settings > General**
2. En **"Default GCP resource location"**, elige la región más cercana

---

## 🚨 Solución de Problemas Comunes

### Error: "Firebase no está configurado correctamente"
- **Causa**: Las credenciales en `firebaseConfig.js` no son válidas
- **Solución**: Verifica que copiaste correctamente el objeto de configuración

### Error: "Permission denied"
- **Causa**: Las reglas de Firestore son muy restrictivas
- **Solución**: Verifica que las reglas permiten acceso a usuarios autenticados

### Error: "Invalid API key"
- **Causa**: La API key es incorrecta o el proyecto no está configurado
- **Solución**: Verifica la configuración en Firebase Console

### Error: "Auth domain not authorized"
- **Causa**: El dominio no está en la lista de dominios autorizados
- **Solución**: Agrega `localhost` o tu dominio a los dominios autorizados

---

## 📚 Recursos Adicionales

- [Documentación oficial de Firebase Auth](https://firebase.google.com/docs/auth)
- [Documentación oficial de Firestore](https://firebase.google.com/docs/firestore)
- [Reglas de seguridad de Firestore](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Console](https://console.firebase.google.com/)

---

## 🎯 Próximos Pasos

Una vez que hayas completado esta configuración:

1. ✅ Tu sistema de autenticación estará funcionando
2. ✅ Los usuarios podrán registrarse e iniciar sesión
3. ✅ Los datos se guardarán en Firestore
4. ✅ Las reglas de seguridad protegerán los datos

**¡Felicidades! Tu sistema de autenticación está listo para usar.** 🎉
