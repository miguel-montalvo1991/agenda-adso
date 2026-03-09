import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError(""); // Limpiamos errores anteriores antes de cargar

        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error(error);

        // Mensaje más claro y útil para el usuario en vez de un texto genérico
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  // Función async para agregar contacto
  // Relanzamos el error para que el formulario también lo pueda manejar (estado enviando)
  const agregarContacto = async (nuevo) => {
    try {
      setError(""); // Limpiamos el error antes de intentar guardar

      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error(error);

      // Mensaje amigable cuando falla guardar
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );

      // Relanzamos el error para que el formulario pueda apagar el estado enviando
      throw error;
    }
  };

  const eliminarContacto = async (id) => {
    try {
      setError(""); // Limpiamos errores previos

      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);

      // Mensaje claro cuando falla eliminar
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  return (
    <main className="min-h-screen">
      {/* Encabezado */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-4">
        <p className="text-xs font-bold text-purple-300 tracking-[0.3em] uppercase mb-2">
          Programa ADSO
        </p>
        <h1 className="text-5xl font-black text-white mb-1">
          Agenda ADSO v6
        </h1>
        <p className="text-purple-200 text-sm">
          Gestión de contactos conectada a una API local con JSON Server,
          ahora con validaciones y mejor experiencia de usuario.
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