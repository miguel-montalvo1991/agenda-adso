// Archivo: src/App.jsx
// Componente principal de la Agenda ADSO v8.
// Agrega búsqueda en tiempo real y ordenamiento alfabético a la lista de contactos.

import { useEffect, useState } from "react";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";

import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Lista original de contactos que viene de la API - nunca la mutamos
  const [contactos, setContactos] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrar, setMostrar] = useState(false);

  // Estado para el término de búsqueda que escribe el usuario
  const [busqueda, setBusqueda] = useState("");

  // Estado para el orden: true = A-Z, false = Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Cargamos los contactos al montar el componente
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error(error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

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

  // Primera transformación: filtramos los contactos según el término de búsqueda
  // Buscamos en nombre, correo, etiqueta Y teléfono (mini reto 1)
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();

    // Normalizamos todo a minúsculas para búsquedas sin importar mayúsculas
    const nombre = c.nombre.toLowerCase();
    const correo = c.correo.toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = (c.telefono || "").toLowerCase(); // mini reto 1

    // El contacto se incluye si el término aparece en cualquiera de los campos
    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino) // mini reto 1
    );
  });

  // Segunda transformación: ordenamos los contactos filtrados alfabéticamente
  // Usamos spread [...] para no mutar el array original - buena práctica React
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <main className="min-h-screen">

      {/* Encabezado usando APP_INFO desde config.js */}
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

        {/* Mensaje de error global */}
        {error && (
          <div className="rounded-2xl bg-red-500/20 border border-red-400/30 px-4 py-3 text-sm text-red-200">
            ⚠️ {error}
          </div>
        )}

        {/* Mensaje de carga */}
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

        {/* Lista desplegable con búsqueda y ordenamiento */}
        {mostrar && (
          <div className="space-y-4">

            {/* Buscador y botón de ordenamiento */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <input
                type="text"
                className="w-full md:flex-1 bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-3 rounded-xl border border-white/20 transition-all font-semibold"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            {/* Mini reto 2: contador de resultados con gramática correcta */}
            <p className="text-purple-300 text-xs">
              Mostrando {contactosOrdenados.length}{" "}
              {contactosOrdenados.length === 1 ? "contacto" : "contactos"}
            </p>

            {/* Lista de contactos filtrados y ordenados */}
            {contactosOrdenados.length === 0 ? (
              <p className="text-purple-200 text-sm text-center py-4">
                No se encontraron contactos que coincidan con la búsqueda.
              </p>
            ) : (
              contactosOrdenados.map((c) => (
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