export default function ContactoCard({ nombre, telefono, correo, empresa, etiqueta, onEliminar }) {
  return (
    // bg-white: fondo blanco | border: borde fino | rounded-lg: esquinas redondeadas
    // shadow-sm: sombra suave | p-4: padding | mb-4: margen inferior entre tarjetas
    <article className="bg-white border rounded-lg shadow-sm p-4 mb-4">

      {/* flex justify-between: separa el contenido del botón a los extremos */}
      <div className="flex justify-between items-start">

        <div>
          {/* Nombre del contacto en morado oscuro */}
          <h3 className="text-lg font-semibold text-morado-oscuro">{nombre}</h3>

          {/* Solo muestra la empresa si tiene valor */}
          {empresa && (
            <p className="text-sm text-gray-600">🏢 {empresa}</p>
          )}

          <p className="text-sm text-gray-600">📞 {telefono}</p>
          <p className="text-sm text-gray-600">✉️ {correo}</p>

          {/* Solo muestra la etiqueta si tiene valor, como una pastilla de color */}
          {etiqueta && (
            <span className="inline-block mt-2 bg-morado text-white text-xs rounded px-2 py-1">
              {etiqueta}
            </span>
          )}
        </div>

        {/* Botón eliminar en rojo con hover más oscuro */}
        <button
          onClick={() => onEliminar(correo)} // Pasa el correo para identificar qué contacto eliminar
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition-colors"
        >
          Eliminar
        </button>

      </div>
    </article>
  );
}