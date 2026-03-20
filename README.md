# 📒 Agenda ADSO v9 – Edición de contactos y cierre del ABP

Proyecto desarrollado en el SENA CTMA como parte del programa de Análisis y Desarrollo de Software (ADSO).  
Esta es la versión 9 de la Agenda ADSO, donde se implementó la funcionalidad de edición de contactos,
completando así el flujo CRUD completo: crear, leer, actualizar y eliminar contactos desde una API REST con JSON Server.

---

## 🛠️ Tecnologías usadas

- React con Vite
- TailwindCSS v3.4.13
- JSON Server v1+
- Fetch API (nativa de JavaScript)
- JavaScript (ES6+)

---

## 📁 Estructura del proyecto
```
agenda-adso/
├── db.json                        ← base de datos local de JSON Server
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── api.js                     ← funciones GET, POST, PUT y DELETE
    ├── config.js                  ← configuración global de la app (APP_INFO)
    ├── App.jsx                    ← componente principal (actualizado v9)
    ├── main.jsx                   ← punto de entrada
    ├── index.css                  ← estilos globales con Tailwind
    └── components/
        ├── FormularioContacto.jsx ← formulario para crear y editar contactos
        └── ContactoCard.jsx       ← tarjeta de cada contacto con botón Editar
```

---

## 🚀 Cómo correr el proyecto

Se necesitan dos terminales abiertas al mismo tiempo:

**Terminal 1 — inicia JSON Server:**
```bash
json-server --watch db.json --port 3002
```

**Terminal 2 — inicia React:**
```bash
npm run dev
```

Luego abre en el navegador:
- App React: `http://localhost:5173`
- API: `http://localhost:3002/contactos`

---

## 📄 Explicación de cada archivo

### `db.json`

Base de datos local de JSON Server. El endpoint `contactos` queda disponible en `http://localhost:3002/contactos`.
```json
{
  "contactos": [
    {
      "id": "1d3f",
      "nombre": "Gustavo Adolfo Bolaños Dorado",
      "telefono": "3217532037",
      "correo": "gabodorado@gmail.com",
      "etiqueta": "profe"
    }
  ]
}
```

---

### `src/api.js`

Centraliza todas las peticiones HTTP hacia la API. Ningún componente llama directamente a fetch.

- `listarContactos()` — GET, retorna el array de contactos
- `crearContacto(data)` — POST, crea un nuevo contacto
- `actualizarContacto(id, data)` — PUT, actualiza un contacto existente por id *(nuevo v9)*
- `eliminarContactoPorId(id)` — DELETE, elimina un contacto por id

---

### `src/config.js`

Archivo de configuración global. Exporta `APP_INFO` con los datos del proyecto para no tener esos datos regados por todo el código.

---

### `src/App.jsx` ← actualizado en v9

Componente principal. Maneja el estado global y toda la lógica del CRUD.

**Estados que maneja:**
- `contactos` — lista de contactos cargada desde la API
- `cargando` — controla el mensaje de carga inicial
- `error` — guarda mensajes de error para mostrarle al usuario
- `busqueda` — guarda el texto del buscador
- `ordenAsc` — controla si la lista va de A–Z o Z–A
- `contactoEnEdicion` *(nuevo v9)* — guarda el contacto que se está editando, o null si no hay ninguno

**Funciones nuevas en v9:**
- `onActualizarContacto` — llama a `actualizarContacto` de la API y reemplaza el contacto en la lista
- `onEditarClick` — activa el modo edición cargando el contacto seleccionado
- `onCancelarEdicion` — limpia `contactoEnEdicion` y vuelve al modo crear

---

### `src/components/FormularioContacto.jsx` ← actualizado en v9

Formulario reutilizable que ahora soporta dos modos:

- **Modo crear:** cuando `contactoEnEdicion` es null. Muestra "Nuevo contacto" y botón "Agregar contacto".
- **Modo editar:** cuando `contactoEnEdicion` tiene datos. Carga los campos con la info del contacto, muestra "Editar contacto", botón "Guardar cambios" y botón "Cancelar edición".

El `useEffect` detecta el cambio de `contactoEnEdicion` y actualiza el formulario automáticamente.

---

### `src/components/ContactoCard.jsx` ← actualizado en v9

Muestra la información de un contacto en una tarjeta.

- Botón **Editar** *(nuevo v9)*: llama a `onEditar` para activar el modo edición en el formulario
- Botón **Eliminar**: llama a `onEliminar` para borrar el contacto de la API y la lista

---

### `src/main.jsx`

Punto de entrada de la app. Renderiza `App` dentro del `div#root` e importa el CSS global.

---

### `src/index.css`

Activa las tres capas de Tailwind y define los estilos globales del body.

---

### `tailwind.config.js`

Configura Tailwind indicando dónde buscar las clases y define los colores del proyecto ADSO.

---

### `postcss.config.js`

Registra Tailwind y Autoprefixer como plugins de PostCSS.

---

## ✅ Funcionalidades

- Cargar contactos desde la API al iniciar la app (GET)
- Agregar nuevos contactos desde el formulario (POST)
- **Editar contactos existentes** con el formulario en modo edición (PUT) *(nuevo v9)*
- Eliminar contactos de la lista y la API (DELETE)
- Cancelar la edición y volver al modo crear *(nuevo v9)*
- Mostrar mensajes de carga y error
- Diseño responsivo con TailwindCSS
- Buscador en tiempo real por nombre, correo y etiqueta
- Ordenamiento A–Z / Z–A con botón para alternar
- Mensaje cuando el filtro no encuentra resultados
- Contador de resultados que muestra cuántos contactos coinciden con la búsqueda

---


