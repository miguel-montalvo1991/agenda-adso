import { useEffect, useState } from "react";
// Importamos las funciones que se comunican con la API
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Estado que guarda el array de contactos
  const [contactos, setContactos] = useState([]);
  // Estado para mostrar un mensaje mientras carga la API
  const [cargando, setCargando] = useState(true);
  // Estado para mostrar mensajes de error si algo falla
  const [error, setError] = useState("");

  // useEffect se ejecuta una sola vez al montar el componente
  useEffect(() => {
    async function cargarContactos() {
      try {
        const data = await listarContactos(); // Petición GET a la API
        setContactos(data);                   // Guardamos los contactos en el estado
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar la lista de contactos");
      } finally {
        setCargando(false); // Quitamos el mensaje de cargando pase lo que pase
      }
    }

    cargarContactos();
  }, []);

  // Función para agregar un contacto usando POST
  const agregarContacto = async (nuevo) => {
    try {
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error(error);
      setError("No se pudo agregar el contacto");
    }
  };

  // Función para eliminar un contacto usando DELETE
  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el contacto");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Programa ADSO
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          Agenda ADSO v5
        </h1>
        <p className="text-gray-500 mt-1">
          Gestión de contactos conectada a una API local con JSON Server.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Mensaje de error */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Mensaje de carga */}
        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            Cargando contactos desde la API...
          </div>
        )}

        {/* Formulario */}
        <FormularioContacto onAgregar={agregarContacto} />

        {/* Lista de contactos */}
        <div className="space-y-4">
          {contactos.length === 0 && !cargando && (
            <p className="text-gray-500 text-sm">
              No hay contactos aún. Agrega el primero usando el formulario.
            </p>
          )}

          {contactos.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={() => eliminarContacto(c.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}