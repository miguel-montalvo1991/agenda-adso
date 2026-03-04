import { useState } from "react";

// Estado inicial del formulario con todos los campos vacíos
const inicial = {
  nombre: "",
  telefono: "",
  correo: "",
  empresa: "",
  etiqueta: "",
};

export default function FormularioContacto({ onAgregar }) {
  // Estado local del formulario
  const [form, setForm] = useState(inicial);

  // Actualiza el campo correspondiente cada vez que el usuario escribe
  // e.target.name identifica qué campo cambió
  // e.target.value es el nuevo valor escrito
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Se ejecuta cuando el usuario envía el formulario
  const onSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!form.nombre || !form.telefono || !form.correo) return; // Valida campos obligatorios
    onAgregar(form);    // Llama a la función del padre para agregar el contacto
    setForm(inicial);   // Limpia el formulario después de agregar
  };

  return (
    // bg-white: fondo blanco | shadow-md: sombra media | rounded-lg: bordes redondeados
    // p-5: padding interior | flex flex-col: disposición vertical | gap-4: separación entre elementos
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4 mb-6"
    >
      <h2 className="text-lg font-bold text-morado-oscuro">Nuevo contacto</h2>

      {/* Cada campo tiene su label y su input envueltos en un div */}
      <div>
        <label className="text-sm font-semibold block mb-1">Nombre *</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Ej: Ana López"
          // focus:ring-2 focus:ring-morado: resalta el borde al hacer clic en el campo
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1">Teléfono *</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          placeholder="Ej: 300 123 4567"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1">Correo *</label>
        <input
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: ana@sena.edu.co"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      {/* Campo empresa - actividad complementaria de la clase */}
      <div>
        <label className="text-sm font-semibold block mb-1">Empresa</label>
        <input
          name="empresa"
          value={form.empresa}
          onChange={onChange}
          placeholder="Ej: SENA"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      <div>
        <label className="text-sm font-semibold block mb-1">Etiqueta (opcional)</label>
        <input
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        />
      </div>

      {/* hover:bg-morado-oscuro: cambia el color al pasar el mouse | transition-colors: animación suave */}
      <button
        type="submit"
        className="bg-morado hover:bg-morado-oscuro text-white py-2 rounded-md font-semibold transition-colors"
      >
        Agregar contacto
      </button>
    </form>
  );
}