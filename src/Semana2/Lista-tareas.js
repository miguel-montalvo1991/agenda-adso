// === Mini Taller: Lista de Tareas (JavaScript Puro) ===

// 1. Estado inicial
let tareas = [
    { id: 1, texto: "Instalar React", completada: false },
    { id: 2, texto: "Aprender Hooks", completada: false },
    { id: 3, texto: "Crear Agenda ADSO", completada: false }
];

// 2. Funciones de lógica
const mostrarTareas = () => {
    console.log("\n=== LISTA DE TAREAS ===");
    tareas.forEach((tarea, index) => {
        const estado = tarea.completada ? "✅" : "❌";
        console.log(`${estado} ${index + 1}. ${tarea.texto} (ID: ${tarea.id})`);
    });
};

const agregarTarea = (texto) => {
    const nuevaTarea = { id: Date.now(), texto, completada: false };
    tareas = [...tareas, nuevaTarea]; // Spread operator para inmutabilidad
    console.log(`✨ Tarea agregada: "${texto}"`);
    return nuevaTarea;
};

const completarTarea = (id) => {
    tareas = tareas.map(t => t.id === id ? { ...t, completada: true } : t);
    console.log(`✔️ Tarea #${id} completada`);
};

const eliminarTarea = (id) => {
    const eliminada = tareas.find(t => t.id === id);
    tareas = tareas.filter(t => t.id !== id);
    if (eliminada) console.log(`🗑️ Eliminada: "${eliminada.texto}"`);
};

const obtenerEstadisticas = () => {
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const porcentaje = total > 0 ? ((completadas / total) * 100).toFixed(1) : 0;
    console.log(`📊 Progreso: ${porcentaje}% | Total: ${total} | OK: ${completadas}`);
};

// 3. DEMOSTRACIÓN (Siempre al final para evitar errores de referencia)
console.log("--- PROBANDO LISTA DE TAREAS ---");
mostrarTareas();
agregarTarea("Configurar Tailwind"); // Aquí ya no dará error
completarTarea(1);
eliminarTarea(2);
mostrarTareas();
obtenerEstadisticas();
