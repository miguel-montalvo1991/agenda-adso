// ejercicios.js - Miguel Montalvo
const aprendices = [
    { nombre: "Ana", nota: 4.2 },
    { nombre: "Luis", nota: 2.8 },
    { nombre: "María", nota: 4.5 },
    { nombre: "Pedro", nota: 3.5 }
];

// 1. Filtrar aprobados (Nota >= 3.0) usando filter
const aprobados = aprendices.filter(a => a.nota >= 3.0);
console.log("Aprobados:", aprobados.length);

// 2. Calcular promedio general usando reduce
const totalNotas = aprendices.reduce((sum, a) => sum + a.nota, 0);
const promedioGrupo = totalNotas / aprendices.length;
console.log(`Promedio grupo: ${promedioGrupo.toFixed(2)}`);

// 3. Generar lista de nombres usando map
const nombres = aprendices.map(a => a.nombre);
console.log("Nombres:", nombres.join(", "));