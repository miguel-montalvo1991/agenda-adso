// Archivo: src/context/AuthContext.jsx
// Maneja el estado de autenticación de toda la aplicación.
// Usa Context API para compartir ese estado con cualquier componente.

import { createContext, useContext, useState } from "react";

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Proveedor que envuelve la app y comparte el estado de autenticación
export function AuthProvider({ children }) {

  // Verificamos si ya hay una sesión guardada en localStorage
  // Si el valor es "true", el usuario ya estaba autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  // Función para iniciar sesión: guarda en localStorage y actualiza el estado
  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión: elimina de localStorage y actualiza el estado
  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    // Compartimos isAuthenticated, login y logout con toda la app
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir el contexto fácilmente
// En vez de importar AuthContext y useContext en cada componente,
// simplemente llamamos useAuth()
export function useAuth() {
  return useContext(AuthContext);
};


