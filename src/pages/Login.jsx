// Archivo: src/pages/Login.jsx
// Pantalla de login de la Agenda ADSO.
// Valida las credenciales y redirige al dashboard si son correctas.
// IMPORTANTE: esta validación es solo pedagógica, no es segura para producción.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Estado para el campo de correo
  const [email, setEmail] = useState("");

  // Estado para el campo de contraseña
  const [password, setPassword] = useState("");

  // Estado para mostrar mensaje de error si las credenciales son incorrectas
  const [error, setError] = useState("");

  // Obtenemos la función login del contexto de autenticación
  const { login } = useAuth();

  // Hook de React Router para redirigir al usuario después del login
  const navigate = useNavigate();

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // limpiamos errores previos

    // Validación básica pedagógica: credenciales fijas
    // En producción esto se haría contra una API con JWT y contraseñas cifradas
    if (email === "admin@sena.com" && password === "1234") {
      login(); // guardamos la sesión en localStorage
      navigate("/"); // redirigimos al dashboard
    } else {
      setError("Correo o contraseña incorrectos. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/95 rounded-3xl shadow-2xl border border-slate-100 px-8 py-10">

        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="h-12 w-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Agenda ADSO
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Campo correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo
            </label>
            <input
              type="email"
              placeholder="admin@sena.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
          </div>

          {/* Campo contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <p className="text-xs text-red-600 font-medium">{error}</p>
          )}

          {/* Botón de login */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm mt-2"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Credenciales de prueba */}
        <div className="mt-6 rounded-xl bg-purple-50 border border-purple-100 px-4 py-3">
          <p className="text-xs font-medium text-purple-800 mb-1">
            Credenciales de prueba:
          </p>
          <p className="text-xs text-purple-700">
            Correo: admin@sena.com
          </p>
          <p className="text-xs text-purple-700">
            Contraseña: 1234
          </p>
        </div>

        {/* Nota de seguridad */}
        <p className="mt-4 text-[11px] text-gray-400 text-center">
          Sistema de login pedagógico. En producción se usaría JWT y cifrado de contraseñas.
        </p>
      </div>
    </div>
  );
}

