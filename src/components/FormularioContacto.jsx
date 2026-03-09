// Importamos useState para manejar los estados del componente
import { useState } from "react";

// Estado inicial del formulario - lo dejamos separado para reutilizarlo al limpiar
const inicial = {
  nombre: "",
  telefono: "",
  correo: "",
  empresa: "",
  etiqueta: "",
};

export default function FormularioContacto({ onAgregar }) {
  // Estado con los valores de cada campo del formulario
  const [form, setForm] = useState(inicial);

  // Estado para guardar los mensajes de error de cada campo obligatorio
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado para saber si el formulario está en proceso de guardado
  // Sirve para desactivar el botón mientras espera la respuesta del servidor
  const [enviando, setEnviando] = useState(false);

  // Estado para mostrar un mensaje de éxito cuando el contacto se guarda bien
  const [exito, setExito] = useState(false);

  // Se ejecuta cada vez que el usuario escribe en cualquier campo
  const onChange = (e) => {
    const { name, value } = e.target;

    // Actualizamos solo el campo que cambió, conservando los demás
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Valida todos los campos obligatorios antes de enviar
  // Retorna true si todo está bien, false si hay algún error
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    // .trim() evita que espacios en blanco pasen como datos válidos
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    // Validamos que el teléfono exista y tenga mínimo 7 caracteres (mini reto)
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 7 caracteres.";
    }

    // Validamos que el correo exista y tenga el símbolo @
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    // Actualizamos el estado para que los mensajes aparezcan en pantalla
    setErrores(nuevosErrores);

    // Solo es válido si ningún campo tiene error
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  }

  // Maneja el envío del formulario
  // Es async porque onAgregar puede hacer una llamada a la API
  const onSubmit = async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // Si hay errores de validación, no continuamos
    if (!validarFormulario()) return;

    try {
      setEnviando(true); // Activamos el estado de carga
      setExito(false);   // Ocultamos mensaje de éxito anterior si había

      // Llamamos a la función del padre para guardar el contacto
      await onAgregar(form);

      // Si todo salió bien, limpiamos el formulario y los errores
      setForm(inicial);
      setErrores({ nombre: "", telefono: "", correo: "" });

      // Mostramos mensaje de éxito por 3 segundos
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } finally {
      // Siempre desactivamos el estado de carga, salió bien o mal
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      {/* Mensaje de éxito - solo aparece cuando el contacto se guarda correctamente */}
      {exito && (
        <div className="rounded-xl bg-green-500/20 border border-green-400/40 px-4 py-3">
          <p className="text-sm font-medium text-green-300">
            ✅ Contacto guardado correctamente.
          </p>
        </div>
      )}

      {/* Fila con Nombre y Teléfono lado a lado en pantallas medianas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Nombre *
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Ej: Camila Pérez"
            className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {/* Mensaje de error debajo del campo - solo aparece si hay error */}
          {errores.nombre && (
            <p className="mt-1 text-xs text-red-400">{errores.nombre}</p>
          )}
        </div>

        {/* Campo Teléfono */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Teléfono *
          </label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Ej: 300 123 4567"
            className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errores.telefono && (
            <p className="mt-1 text-xs text-red-400">{errores.telefono}</p>
          )}
        </div>
      </div>

      {/* Campo Correo */}
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Correo *
        </label>
        <input
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: camila@sena.edu.co"
          className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {errores.correo && (
          <p className="mt-1 text-xs text-red-400">{errores.correo}</p>
        )}
      </div>

      {/* Campo Empresa - no es obligatorio, sin validación */}
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Empresa
        </label>
        <input
          name="empresa"
          value={form.empresa}
          onChange={onChange}
          placeholder="Ej: SENA"
          className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Campo Etiqueta - tampoco es obligatorio */}
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
          className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Botón de enviar - se desactiva y cambia texto mientras guarda */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-500
                   disabled:bg-purple-800 disabled:cursor-not-allowed
                   text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
      >
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>

    </form>
  );
}