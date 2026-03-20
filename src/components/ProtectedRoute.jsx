// Archivo: src/components/ProtectedRoute.jsx
// Componente que protege rutas privadas de la aplicación.
// Si el usuario no está autenticado, lo redirige al login.
// Si sí está autenticado, renderiza el componente hijo normalmente.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  // Obtenemos el estado de autenticación del contexto
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, redirigimos al login
  // Navigate reemplaza la ruta actual sin agregar al historial
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizamos el componente que se quería ver
  return children;
}

