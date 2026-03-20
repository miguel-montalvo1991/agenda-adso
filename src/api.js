// Archivo: src/api.js
// Capa de acceso a datos de la Agenda ADSO (llamadas a la API REST con JSON Server).
// Ningún componente llama directamente a fetch, todo pasa por aquí.

// Importamos la URL base desde config.js
// Si cambia el puerto o la ruta, solo se toca config.js
import { API_BASE_URL } from "./config";

// Función GET: obtiene la lista completa de contactos (READ)
export async function listarContactos() {
  // Hacemos un GET a la URL base (retorna el array de contactos)
  const res = await fetch(API_BASE_URL);

  // Si la respuesta no es correcta (4xx o 5xx), lanzamos un error
  if (!res.ok) throw new Error("Error al listar contactos");

  // Parseamos el JSON y lo retornamos
  return res.json();
}

// Función POST: crea un nuevo contacto en la API (CREATE)
export async function crearContacto(data) {
  // Hacemos un POST enviando el objeto del contacto como JSON
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // convertimos el objeto a JSON
  });

  // Validamos que la respuesta sea exitosa
  if (!res.ok) throw new Error("Error al crear el contacto");

  // Retornamos el contacto creado que devuelve la API (ya incluye el id)
  return res.json();
}

// Función PUT: actualiza un contacto existente por su id (UPDATE)
// Recibe el id y el objeto con los datos nuevos
export async function actualizarContacto(id, data) {
  // Hacemos un PUT a /contactos/:id con el contacto actualizado
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // mandamos el contacto completo
  });

  // Validamos que la actualización fue exitosa
  if (!res.ok) throw new Error("Error al actualizar el contacto");

  // JSON Server nos devuelve el contacto ya actualizado
  return res.json();
}

// Función DELETE: elimina un contacto por su id (DELETE)
export async function eliminarContactoPorId(id) {
  // Hacemos un DELETE a /contactos/:id
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

  // Validamos que la eliminación fue exitosa
  if (!res.ok) throw new Error("Error al eliminar el contacto");

  // Retornamos true para indicar que se eliminó correctamente
  return true;
}