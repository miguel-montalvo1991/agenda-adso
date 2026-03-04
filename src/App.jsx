import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];

  const [contactos, setContactos] = useState(contactosGuardados);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Agenda ADSO v4
      </h1>
      <p className="text-purple-200 text-center mb-2">
        Interfaz moderna con TailwindCSS
      </p>
      <p className="bg-morado text-white text-xs rounded px-2 py-1 w-fit mx-auto mb-6">
        ADSO
      </p>

      <FormularioContacto onAgregar={agregarContacto} />

      <button
        onClick={() => setMostrar(!mostrar)}
        className="w-full bg-morado hover:bg-morado-oscuro text-white py-2 rounded-md font-semibold transition-colors mb-4"
      >
        {mostrar ? "Ocultar contactos" : `Contactos guardados (${contactos.length})`}
      </button>

      {mostrar && (
        <div>
          {contactos.length === 0 ? (
            <p className="text-center text-purple-200 mt-4">
              No hay contactos guardados.
            </p>
          ) : (
            contactos.map((c) => (
              <ContactoCard
                key={c.correo}
                {...c}
                onEliminar={eliminarContacto}
              />
            ))
          )}
        </div>
      )}
    </main>
  );
}