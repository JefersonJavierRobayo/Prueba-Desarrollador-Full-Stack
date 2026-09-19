# Prueba Técnica - Desarrollador Full Stack / Ionic Angular

Aplicación móvil híbrida desarrollada con **Ionic** y **Angular** que permite la visualización de un catálogo de productos, gestión dinámica de carrito de compras, cálculo de puntos y compilación para dispositivos móviles **Android**.

---

## 🚀 Características Principales

* **Catálogo de Productos:**
  * Lista dinámicamente los productos disponibles consumiendo el servicio de productos.
  * Selector interactivo de cantidad en tarjetas de producto con renderizado condicional (Botón *"Agregar al carrito"* vs. Control `+` / `-`).
  * Estilizado personalizado para controles de cantidad con botones e íconos en blanco sobre el tema primario.
* **Gestión del Carrito de Compras (`CartService`):**
  * Sincronización instantánea de items seleccionados, incremento y decremento de unidades y eliminación por ID.
  * Notificaciones visuales integradas con `ToastController`.
* **Calculadora de Puntos:**
  * Módulo dedicado para estimación y redención de puntos según el valor de compra.
* **Autenticación:**
  * Estado de sesión mediante `AuthService` para proteger acciones y vistas clave.
* **Soporte Móvil Multiplataforma (Capacitor):**
  * Configuración completa con Capacitor para compilación y despliegue en Android.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend Framework:** Angular (Standalone Components)
* **UI Components:** Ionic Framework & Ionicons
* **State Management / Services:** RxJS
* **Mobile Runtime:** Capacitor (Android)
* **Lenguaje:** TypeScript, HTML5, SCSS
* **Entorno Móvil:** Android Studio (Gradle 8.14.3 / Java JDK 17 o 21)

---

## ⚙️ Requisitos Previos

Asegúrate de contar con las siguientes herramientas instaladas en tu entorno de desarrollo:

* [Node.js](https://nodejs.org/) (Versión 18 o superior)
* [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
* [Android Studio](https://developer.android.com/studio) (Con SDK de Android y JDK 17 o 21 configurado)

---

## 💻 Instalación y Configuración Web

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JefersonJavierRobayo/Prueba-Desarrollador-Full-Stack.git

   
Generación del APK para Android
Para sincronizar los cambios web y generar el instalador ejecutable .apk:

Compilar el proyecto de Angular/Ionic:

Bash
ionic build
Sincronizar el código web con la plataforma Android:

Bash
npx cap sync android
Abrir el proyecto en Android Studio:

Bash
npx cap open android

