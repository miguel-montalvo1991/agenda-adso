// Archivo: src/App.jsx
// Componente principal de la Agenda ADSO.
// Orquesta el estado global, la comunicación con la API
// y la renderización de los componentes hijos.

import { useEffect, useState } from "react";

// Importamos las funciones de la capa de API
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";

// Importamos la configuración global de la app desde config.js
// Esto evita tener textos fijos quemados dentro del JSX
import { APP_INFO } from "./config";

// Importamos los componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Lista de contactos que se muestra en pantalla
  const [contactos, setContactos] = useState([]);

  // Indica si la app está cargando datos al inicio
  const [cargando, setCargando] = useState(true);

  // Guarda mensajes de error globales de la aplicación
  const [error, setError] = useState("");

  // Controla si la lista de contactos está desplegada o no
  const [mostrar, setMostrar] = useState(false);

  // Al montar el componente, cargamos los contactos desde la API
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError("");

        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error(error);

        // Mensaje amigable en vez de un error técnico
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  // Función async para agregar un nuevo contacto
  // Relanzamos el error para que el formulario pueda manejar el estado enviando
  const agregarContacto = async (nuevo) => {
    try {
      setError("");

      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error(error);

      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );

      throw error;
    }
  };

  // Función para eliminar un contacto por su id
  const eliminarContacto = async (id) => {
    try {
      setError("");

      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);

      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  return (
    <main className="min-h-screen">

      {/* Encabezado - usa APP_INFO desde config.js en vez de texto quemado */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-4">
        <p className="text-xs font-bold text-purple-300 tracking-[0.3em] uppercase mb-2">
          Programa ADSO
        </p>
        <h1 className="text-5xl font-black text-white mb-1">
          {APP_INFO.titulo}
        </h1>
        <p className="text-purple-200 text-sm">
          {APP_INFO.subtitulo}
        </p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-6 space-y-6">

        {/* Mensaje de error global - aparece cuando algo falla en la API */}
        {error && (
          <div className="rounded-2xl bg-red-500/20 border border-red-400/30 px-4 py-3 text-sm text-red-200">
            ⚠️ {error}
          </div>
        )}

        {/* Mensaje de carga mientras espera la respuesta de la API */}
        {cargando && (
          <div className="rounded-2xl bg-purple-500/20 border border-purple-400/30 px-4 py-3 text-sm text-purple-200">
            ⏳ Cargando contactos desde la API...
          </div>
        )}

        {/* Formulario con efecto cristal */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-white font-bold text-lg mb-4">➕ Nuevo contacto</h2>
          <FormularioContacto onAgregar={agregarContacto} />
        </div>

        {/* Botón contador desplegable */}
        <button
          onClick={() => setMostrar(!mostrar)}
          className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-2xl font-semibold shadow-xl transition-all"
        >
          <span className="flex items-center gap-3">
            <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {contactos.length}
            </span>
            Contactos guardados
          </span>
          <span className="text-purple-300 text-xl">
            {mostrar ? "▲" : "▼"}
          </span>
        </button>

        {/* Lista desplegable de contactos */}
        {mostrar && (
          <div className="space-y-4">
            {contactos.length === 0 && !cargando ? (
              <p className="text-purple-200 text-sm text-center py-4">
                No hay contactos aún. Agrega el primero usando el formulario.
              </p>
            ) : (
              contactos.map((c) => (
                <ContactoCard
                  key={c.id}
                  {...c}
                  onEliminar={() => eliminarContacto(c.id)}
                />
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}