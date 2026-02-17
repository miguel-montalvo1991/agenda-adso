let tareas = [
    { id: 1, texto: "Instalar React", completada: false },
    { id: 2, texto: "Aprender Hooks", completada: false },
    { id: 3, texto: "Crear Agenda ADSO", completada: false }
];

const mostrarTareas = () => {
    console.log("\n=== LISTA DE TAREAS ===");
    tareas.forEach((tarea, index) => {
        const estado = tarea.completada ? "✅" : "❌";
        console.log(`${estado} ${index + 1}. ${tarea.texto}`);
    });
};

const agregarTarea = (texto) => {
    const nuevaTarea = { id: Date.now(), texto, completada: false };
    tareas = [...tareas, nuevaTarea];
    console.log(`✨ Tarea agregada: "${texto}"`);
};

const completarTarea = (id) => {
    tareas = tareas.map(t => t.id === id ? { ...t, completada: true } : t);
};

// === EJECUCIÓN PARA PROBAR ===
agregarTarea("Estudiar ES6");
completarTarea(1); // Marcamos "Instalar React" como lista
mostrarTareas();