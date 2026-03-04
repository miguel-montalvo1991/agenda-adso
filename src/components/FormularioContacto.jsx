import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  // Estado local del formulario con todos los campos vacíos
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
    empresa: "", // campo extra - mini reto de la clase
  });

  // onChange genérico: detecta qué campo cambió por el atributo "name"
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // onSubmit: valida los campos obligatorios y llama al padre
  const onSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "", empresa: "" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      {/* Grid de 2 columnas en pantallas medianas, 1 en móvil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
        </div>
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
      </div>

      {/* Campo Empresa - mini reto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empresa
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="empresa"
          placeholder="Ej: SENA"
          value={form.empresa}
          onChange={onChange}
        />
      </div>

      {/* Campo Etiqueta opcional */}
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

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-colors"
      >
        Agregar contacto
      </button>
    </form>
  );
}