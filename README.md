# 📒 Agenda ADSO v10 – Versión PRO con Dashboard

Proyecto desarrollado en el SENA CTMA como parte del programa de Análisis y Desarrollo de Software (ADSO).  
Esta es la versión 10 de la Agenda ADSO, donde se evolucionó la interfaz hacia un layout tipo dashboard
con dos vistas diferenciadas, sin modificar la lógica de negocio ni la API.

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
    ├── App.jsx                    ← componente principal (actualizado v10)
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
- `actualizarContacto(id, data)` — PUT, actualiza un contacto existente por id
- `eliminarContactoPorId(id)` — DELETE, elimina un contacto por id

---

### `src/config.js`

Archivo de configuración global. Exporta `APP_INFO` con los datos del proyecto para no tener esos datos regados por todo el código.

---

### `src/App.jsx` ← actualizado en v10

Componente principal. En esta versión se rediseñó la interfaz con un layout tipo dashboard.

**Estados que maneja:**
- `contactos` — lista de contactos cargada desde la API
- `cargando` — controla el mensaje de carga inicial
- `error` — guarda mensajes de error para mostrarle al usuario
- `busqueda` — guarda el texto del buscador
- `ordenAsc` — controla si la lista va de A–Z o Z–A
- `contactoEnEdicion` — guarda el contacto que se está editando, o null si no hay ninguno
- `vista` *(nuevo v10)* — controla la vista activa: `"crear"` o `"contactos"`

**Funciones nuevas en v10:**
- `irAVerContactos` — cambia la vista a `"contactos"` y limpia la edición activa
- `irACrearContacto` — vuelve a la vista `"crear"` y limpia búsqueda y edición

**Layout del dashboard:**
- Barra superior fija con el nombre de la app y la ficha
- Grid de dos columnas: contenido principal a la izquierda, panel lateral a la derecha
- Panel lateral con estadísticas, tips de código y mensaje motivacional

---

### `src/components/FormularioContacto.jsx`

Sin cambios desde v9. Soporta modo crear y modo editar según el valor de `contactoEnEdicion`.

---

### `src/components/ContactoCard.jsx`

Sin cambios desde v9. Muestra la info del contacto con botones Editar y Eliminar.

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
- Editar contactos existentes con el formulario en modo edición (PUT)
- Eliminar contactos de la lista y la API (DELETE)
- Cancelar la edición y volver al modo crear
- Mostrar mensajes de carga y error
- Diseño responsivo con TailwindCSS
- Buscador en tiempo real por nombre, correo y etiqueta
- Ordenamiento A–Z / Z–A con botón para alternar
- Mensaje cuando el filtro no encuentra resultados
- Contador de resultados que muestra cuántos contactos coinciden con la búsqueda
- **Layout tipo dashboard** con barra superior y panel lateral *(nuevo v10)*
- **Vista "Crear contacto"** — solo el formulario para agregar contactos *(nuevo v10)*
- **Vista "Ver contactos"** — lista, búsqueda, ordenamiento y edición *(nuevo v10)*
- **Panel lateral** con estadísticas, tips y mensaje motivacional *(nuevo v10)*

---


