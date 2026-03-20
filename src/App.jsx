// Archivo: src/App.jsx
// Componente principal de la Agenda ADSO v9.
// Maneja el estado global de la app y conecta todos los componentes.
// Novedades v9: estado contactoEnEdicion + funciones para editar contactos.

import { useEffect, useState } from "react";

// Importamos todas las funciones de la API, incluyendo la nueva actualizarContacto
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api";

import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // Lista de contactos cargada desde la API
  const [contactos, setContactos] = useState([]);

  // Controla el mensaje de carga inicial
  const [cargando, setCargando] = useState(true);

  // Guarda mensajes de error para mostrarle al usuario
  const [error, setError] = useState("");

  // Texto que escribe el usuario en el buscador
  const [busqueda, setBusqueda] = useState("");

  // true = orden A-Z | false = orden Z-A
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Contacto que se está editando actualmente
  // Si es null, el formulario está en modo crear
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // Cargamos los contactos una sola vez al montar el componente
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // CREATE: agrega un nuevo contacto a la API y lo suma a la lista
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  // UPDATE: actualiza el contacto en la API y reemplaza el registro en la lista
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");

      // Llamamos a la API con el id y los datos nuevos
      const actualizado = await actualizarContacto(
        contactoActualizado.id,
        contactoActualizado
      );

      // Recorremos la lista y reemplazamos solo el contacto que cambió
      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );

      // Salimos del modo edición
      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError(
        "No se pudo actualizar el contacto. Verifica tu conexión o el servidor e intenta nuevamente."
      );
      throw error;
    }
  };

  // DELETE: elimina el contacto de la API y lo quita de la lista
  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);

      // Filtramos el contacto eliminado de la lista
      setContactos((prev) => prev.filter((c) => c.id !== id));

      // Si el contacto eliminado estaba en edición, cancelamos la edición
      setContactoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  // Activa el modo edición cargando el contacto seleccionado
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError(""); // limpiamos errores previos al entrar a editar
  };

  // Cancela la edición y vuelve al modo crear
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  // ── BÚSQUEDA Y ORDENAMIENTO (heredado de v8) ──────────────────────────────

  // 1. Filtramos por el término de búsqueda en nombre, correo y etiqueta
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.correo.toLowerCase().includes(termino) ||
      (c.etiqueta || "").toLowerCase().includes(termino)
    );
  });

  // 2. Ordenamos los resultados filtrados por nombre
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Encabezado */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>
          <p className="text-sm text-gray-600 mt-1">{APP_INFO.subtitulo}</p>
        </header>

        {/* Mensaje de error global */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            {/* Formulario: recibe el contacto en edición y los handlers */}
            <FormularioContacto
              onAgregar={onAgregarContacto}
              onActualizar={onActualizarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onCancelarEdicion={onCancelarEdicion}
            />

            {/* Buscador y botón de orden */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar por nombre, correo o etiqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            {/* Lista de contactos */}
            <section className="space-y-4">
              {contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron contactos que coincidan con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                    onEditar={() => onEditarClick(c)} // nuevo en v9
                  />
                ))
              )}
            </section>
          </>
        )}

        {/* Pie de página */}
        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
```

**Commit:**
```
