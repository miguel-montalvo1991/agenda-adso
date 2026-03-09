// Archivo: src/api.js
// Capa de acceso a datos de Agenda ADSO.
// Aquí se concentran todos los llamados a la API REST (JSON Server).
// Ningún componente llama directamente a fetch, todo pasa por aquí.

// Importamos la URL base desde config.js
// Si cambia el puerto o la ruta, solo se toca config.js
import { API_BASE_URL } from "./config";

// Función GET: obtiene la lista completa de contactos
export async function listarContactos() {
  // Hacemos un GET a la URL base (retorna el array de contactos)
  const res = await fetch(API_BASE_URL);

  // Si la respuesta no es correcta (código 4xx o 5xx), lanzamos un error
  // para que el componente que llamó esta función lo pueda capturar
  if (!res.ok) throw new Error("Error al listar contactos");

  // Parseamos el JSON y lo retornamos
  return res.json();
}

// Función POST: crea un nuevo contacto en la API
export async function crearContacto(data) {
  // Hacemos un POST enviando el objeto del contacto como JSON
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Le decimos que el body es JSON
    body: JSON.stringify(data), // Convertimos el objeto JavaScript a JSON
  });

  // Validamos que la respuesta sea exitosa
  if (!res.ok) throw new Error("Error al crear el contacto");

  // Retornamos el contacto creado que devuelve la API (ya incluye el id generado)
  return res.json();
}

// Función DELETE: elimina un contacto por su id
export async function eliminarContactoPorId(id) {
  // Hacemos un DELETE a /contactos/:id concatenando el id a la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

  // Validamos que la eliminación fue exitosa
  if (!res.ok) throw new Error("Error al eliminar el contacto");

  // Retornamos true para indicar que se eliminó correctamente
  return true;
}