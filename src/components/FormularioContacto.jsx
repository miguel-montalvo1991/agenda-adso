// Archivo: src/components/FormularioContacto.jsx
// Formulario reutilizable para crear y editar contactos.
// Modo crear: cuando contactoEnEdicion es null, usa onAgregar.
// Modo editar: cuando contactoEnEdicion tiene datos, usa onActualizar.

import { useEffect, useState } from "react";

function FormularioContacto({
  onAgregar,
  onActualizar,
  contactoEnEdicion,
  onCancelarEdicion,
}) {
  // Estado del formulario con los 4 campos
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Errores de validación por campo
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Controla si el formulario está esperando respuesta del servidor
  const [enviando, setEnviando] = useState(false);

  // Cada vez que cambia contactoEnEdicion, actualizamos el formulario
  // Si llega un contacto, llenamos los campos con sus datos
  // Si es null, limpiamos todo (modo crear)
  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });
      // Limpiamos errores al entrar en modo edición
      setErrores({ nombre: "", telefono: "", correo: "" });
    } else {
      // Si no hay contacto en edición, dejamos el form vacío
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    }
  }, [contactoEnEdicion]); // se dispara cada vez que cambia este prop

  // Actualiza el campo correspondiente mientras el usuario escribe
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Valida los campos obligatorios antes de enviar
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim())
      nuevosErrores.nombre = "El nombre es obligatorio.";

    if (!form.telefono.trim())
      nuevosErrores.telefono = "El teléfono es obligatorio.";

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    // Retorna true solo si no hay ningún error
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  }

  // Maneja el envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    // Si la validación falla, no seguimos
    if (!validarFormulario()) return;

    try {
      setEnviando(true);

      if (contactoEnEdicion) {
        // MODO EDICIÓN: llamamos a onActualizar pasando el id del contacto original
        await onActualizar({ ...form, id: contactoEnEdicion.id });

        // Limpiamos el form y salimos del modo edición
        setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
        setErrores({ nombre: "", telefono: "", correo: "" });
        if (onCancelarEdicion) onCancelarEdicion();
      } else {
        // MODO CREAR: igual que en v8
        await onAgregar(form);

        // Limpiamos el form para un nuevo contacto
        setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
        setErrores({ nombre: "", telefono: "", correo: "" });
      }
    } finally {
      setEnviando(false);
    }
  };

  // Variable para saber en qué modo estamos
  const estaEnEdicion = Boolean(contactoEnEdicion);

  // Textos dinámicos según el modo
  const tituloFormulario = estaEnEdicion ? "Editar contacto" : "Nuevo contacto";
  const textoBoton = estaEnEdicion ? "Guardar cambios" : "Agregar contacto";

  return (
    <form
      className="bg-white shadow-sm rounded-2xl p-6 space-y-4 mb-8"
      onSubmit={onSubmit}
    >
      {/* Título cambia según el modo */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {tituloFormulario}
      </h2>

      {/* Campo Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />
        {errores.nombre && (
          <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>
        )}
      </div>

      {/* Campo Teléfono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />
        {errores.telefono && (
          <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>
        )}
      </div>

      {/* Campo Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <p className="mt-1 text-xs text-red-600">{errores.correo}</p>
        )}
      </div>

      {/* Campo Etiqueta - opcional */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botones */}
      <div className="pt-2 flex flex-col md:flex-row md:items-center gap-3">
        {/* Botón principal: crea o guarda según el modo */}
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700
                     disabled:bg-purple-300 disabled:cursor-not-allowed
                     text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando ? "Guardando..." : textoBoton}
        </button>

        {/* Botón cancelar: solo aparece en modo edición */}
        {estaEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="w-full md:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-200 text-sm"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioContacto;