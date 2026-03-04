export default function ContactoCard({ nombre, telefono, correo, etiqueta, empresa, onEliminar }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl flex items-start justify-between">

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">{nombre}</h3>

        {empresa && (
          <p className="text-purple-200 text-sm flex items-center gap-2">
            <span>🏢</span>{empresa}
          </p>
        )}

        <p className="text-purple-200 text-sm flex items-center gap-2">
          <span>📞</span>{telefono}
        </p>

        <p className="text-purple-200 text-sm flex items-center gap-2">
          <span>✉️</span>{correo}
        </p>

        {etiqueta && (
          <span className="inline-block bg-purple-500/40 text-purple-100 text-xs px-3 py-1 rounded-full mt-2 border border-purple-400/30">
            {etiqueta}
          </span>
        )}
      </div>

      <button
        onClick={onEliminar}
        className="bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-xl shadow transition-all"
      >
        Eliminar
      </button>
    </div>
  );
}