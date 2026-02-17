// Ejercicio 3: Funciones y objetos - Agenda ADSO

/**
 * 1. Función de flecha (Arrow Function) para crear un objeto contacto.
 * Esta función recibe nombre y teléfono, y genera automáticamente un ID y la fecha.
 */
const crearContacto = (nombre, telefono) => ({
    id: Date.now(), // Genera un ID único basado en el tiempo actual
    nombre: nombre,
    telefono: telefono,
    fechaCreacion: new Date().toLocaleDateString()
});

// 2. Crear una instancia de prueba
const contacto1 = crearContacto("Gustavo", "3001234567");

// 3. Mostrar el objeto completo en la consola
console.log("Objeto completo creado:");
console.log(contacto1);

/**
 * 4. Desestructuración de objetos:
 * Extraemos solo las propiedades que necesitamos en variables nuevas.
 */
const { nombre: nombreContacto, telefono } = contacto1;

// 5. Imprimir usando Template Literals (comillas invertidas)
console.log("\nResultado de la desestructuración:");
console.log(`Contacto: ${nombreContacto} - Teléfono: ${telefono}`);