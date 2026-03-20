# 📒 Agenda ADSO v10 – Versión PRO conectada a Render

Proyecto desarrollado en el SENA CTMA como parte del programa de Análisis y Desarrollo de Software (ADSO).  
Esta es la versión 10 de la Agenda ADSO, con un layout tipo dashboard, dos vistas diferenciadas y conexión
a una API REST desplegada en la nube con Render.

---

## 🛠️ Tecnologías usadas

- React con Vite
- TailwindCSS v3.4.13
- JSON Server v0.17.4 (backend separado)
- Fetch API (nativa de JavaScript)
- JavaScript (ES6+)
- Render (deploy del backend)

---

## 📁 Estructura del proyecto
```
agenda-adso/
├── db.json                        ← ya no se usa localmente, la API está en Render
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── api.js                     ← funciones GET, POST, PUT y DELETE
    ├── config.js                  ← URL de la API remota y configuración global
    ├── App.jsx                    ← componente principal con dashboard v10
    ├── main.jsx                   ← punto de entrada
    ├── index.css                  ← estilos globales con Tailwind
    └── components/
        ├── FormularioContacto.jsx ← formulario para crear y editar contactos
        └── ContactoCard.jsx       ← tarjeta de cada contacto con botón Editar
```

---

## 🚀 Cómo correr el proyecto

Como el backend ya está desplegado en Render, solo se necesita una terminal:
```bash
npm install
npm run dev
```

Luego abre en el navegador:
```
http://localhost:5173
```

> Ya no es necesario correr JSON Server en local. La app consume la API remota directamente.

---

## 🌐 API en producción
```
https://agenda-adso-api-gjwn.onrender.com/contactos
```

Repositorio del backend:  
[https://github.com/miguel-montalvo1991/agenda-adso-api](https://github.com/miguel-montalvo1991/agenda-adso-api)

---

## 📄 Explicación de cada archivo

### `src/config.js`

Centraliza la configuración global de la app. Exporta `API_BASE_URL` apuntando a la API en Render y `APP_INFO` con los datos del proyecto.

### `src/api.js`

Centraliza todas las peticiones HTTP. Ningún componente llama directamente a fetch.

- `listarContactos()` — GET, retorna el array de contactos
- `crearContacto(data)` — POST, crea un nuevo contacto
- `actualizarContacto(id, data)` — PUT, actualiza un contacto por id
- `eliminarContactoPorId(id)` — DELETE, elimina un contacto por id

### `src/App.jsx` ← versión PRO v10

Componente principal con layout tipo dashboard.

**Estados que maneja:**
- `contactos` — lista de contactos cargada desde la API
- `cargando` — controla el mensaje de carga inicial
- `error` — mensajes de error para el usuario
- `busqueda` — texto del buscador
- `ordenAsc` — orden A–Z o Z–A
- `contactoEnEdicion` — contacto en modo edición o null
- `vista` — vista activa: `"crear"` o `"contactos"`

**Layout:**
- Barra superior con nombre de la app y ficha
- Columna izquierda: contenido principal según la vista activa
- Columna derecha: panel lateral con estadísticas, tips y mensaje motivacional

### `src/components/FormularioContacto.jsx`

Formulario reutilizable con dos modos: crear y editar. El `useEffect` detecta el cambio de `contactoEnEdicion` y actualiza los campos automáticamente.

### `src/components/ContactoCard.jsx`

Tarjeta de cada contacto con botones Editar y Eliminar.

---

## ✅ Funcionalidades

- Cargar contactos desde la API remota en Render (GET)
- Agregar nuevos contactos desde el formulario (POST)
- Editar contactos existentes en modo edición (PUT)
- Eliminar contactos de la lista y la API (DELETE)
- Cancelar la edición y volver al modo crear
- Mensajes de carga y error
- Diseño responsivo con TailwindCSS
- Buscador en tiempo real por nombre, correo y etiqueta
- Ordenamiento A–Z / Z–A
- Contador de resultados
- Layout tipo dashboard con panel lateral
- Vista "Crear contacto" y vista "Ver contactos"

---

## 📝 Historial de versiones

| Versión | Descripción |
|---|---|
| v1 | Componentes y props básicos |
| v2 | useState y formularios controlados |
| v3 | Persistencia con localStorage |
| v5 | Integración con API REST y JSON Server |
| v6 | Validaciones y mejoras de UX |
| v7 | Refactor y documentación |
| v8 | Búsqueda y ordenamiento |
| v9 | Edición de contactos (CRUD completo) |
| v10 | Dashboard PRO con dos vistas y API en Render |




