import { useState } from "react";

const inicial = {
  nombre: "",
  telefono: "",
  correo: "",
  empresa: "",
  etiqueta: "",
};

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState(inicial);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm(inicial);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">Nombre *</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Ej: Camila Pérez"
            className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">Teléfono *</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Ej: 300 123 4567"
            className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Correo *</label>
        <input
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: camila@sena.edu.co"
          className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Empresa</label>
        <input
          name="empresa"
          value={form.empresa}
          onChange={onChange}
          placeholder="Ej: SENA"
          className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">Etiqueta (opcional)</label>
        <input
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
          className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
      >
        Agregar contacto
      </button>
    </form>
  );
}