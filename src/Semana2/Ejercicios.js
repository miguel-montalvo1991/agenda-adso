// Ejercicio 1: Variables y operaciones básicas
const nombre = "Carolina";
const ficha = 3223874;
const nota1 = 4.0;
const nota2 = 4.5;
const nota3 = 3.8;

const promedio = (nota1 + nota2 + nota3) / 3;
console.log(`Aprendiz: ${nombre}`);
console.log(`Ficha: ${ficha}`);
console.log(`Promedio: ${promedio.toFixed(2)}`);

const aprobado = promedio >= 3.0;
console.log(`Estado: ${aprobado ? 'APROBADO' : 'NO APROBADO'}`);

console.log("----------------------------");

// Ejercicio 2: Arreglos y métodos (filter, reduce, map)
const aprendices = [
    { nombre: "Ana", nota: 4.2 },
    { nombre: "Luis", nota: 2.8 },
    { nombre: "María", nota: 4.5 },
    { nombre: "Pedro", nota: 3.5 }
];

// Filtrar aprobados
const aprobados = aprendices.filter(a => a.nota >= 3.0);
console.log("Aprobados:", aprobados.length);

// Calcular promedio general con reduce
const totalNotas = aprendices.reduce((sum, a) => sum + a.nota, 0);
const promedioGrupo = totalNotas / aprendices.length;
console.log("Promedio grupo:", promedioGrupo.toFixed(2));

// Generar lista de nombres con map
const nombres = aprendices.map(a => a.nombre);
console.log("Nombres:", nombres.join(", "));