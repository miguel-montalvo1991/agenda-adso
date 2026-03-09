// Archivo: src/config.js
// Este archivo centraliza las configuraciones reutilizables de la Agenda ADSO.
// Si cambia el puerto, la ficha o el título, solo se modifica aquí
// y el cambio se refleja en toda la aplicación automáticamente.

// URL base del backend local de Agenda ADSO.
// Si cambia el puerto o la ruta, solo se modifica en esta línea.
export const API_BASE_URL = "http://localhost:3001/contactos";

// Información general de la aplicación que se utiliza en App.jsx
// Centralizar esto evita tener textos "quemados" en varios archivos
export const APP_INFO = {
  ficha: "3229209",
  titulo: "Agenda ADSO v7",
  subtitulo:
    "Gestión de contactos conectada a una API local con JSON Server, con validaciones y mejor experiencia de usuario.",
};