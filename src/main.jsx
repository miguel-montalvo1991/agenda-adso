// Archivo: src/main.jsx
// Punto de entrada de la aplicación.
// Envolvemos la app con BrowserRouter para las rutas
// y con AuthProvider para el contexto de autenticación.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter habilita el sistema de rutas en toda la app */}
    <BrowserRouter>
      {/* AuthProvider comparte el estado de autenticación en toda la app */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);