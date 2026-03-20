# 📒 Agenda ADSO v11 – Login y rutas protegidas

Proyecto desarrollado en el SENA CTMA como parte del programa de Análisis y Desarrollo de Software (ADSO).  
Esta versión agrega un sistema básico de autenticación con pantalla de login, manejo de sesión y rutas protegidas usando Context API y React Router.

---

## ⚠️ Nota de seguridad

El sistema de login implementado es únicamente pedagógico. En aplicaciones reales se utilizan:
- JWT (JSON Web Token)
- bcrypt para cifrado de contraseñas
- Validación de credenciales en el backend
- Control de sesiones seguro

---

## 🛠️ Tecnologías usadas

- React con Vite
- TailwindCSS v3.4.13
- React Router DOM
- Context API
- JSON Server (backend en Render)
- Fetch API (nativa de JavaScript)
- JavaScript (ES6+)

---

## 📁 Estructura del proyecto
```
agenda-adso/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── api.js                     ← funciones GET, POST, PUT y DELETE
    ├── config.js                  ← URL de la API remota y configuración global
    ├── App.jsx                    ← rutas y componente Dashboard
    ├── main.jsx                   ← punto de entrada con BrowserRouter y AuthProvider
    ├── index.css                  ← estilos globales con Tailwind
    ├── context/
    │   └── AuthContext.jsx        ← contexto de autenticación (login, logout, isAuthenticated)
    ├── pages/
    │   └── Login.jsx              ← pantalla de login
    └── components/
        ├── ProtectedRoute.jsx     ← protege rutas privadas
        ├── FormularioContacto.jsx ← formulario para crear y editar contactos
        └── ContactoCard.jsx       ← tarjeta de cada contacto con botón Editar
```

---

## 🚀 Cómo correr el proyecto
```bash
npm install
npm run dev
```

Luego abre en el navegador:
```
http://localhost:5173
```

La app redirige automáticamente al login si no hay sesión activa.

---

## 🔐 Credenciales de prueba

| Campo | Valor |
|---|---|
| Correo | admin@sena.com |
| Contraseña | 1234 |

---

## 🌐 API en producción
```
https://agenda-adso-api-gjwn.onrender.com/contactos
```

Repositorio del backend:  
[https://github.com/miguel-montalvo1991/agenda-adso-api](https://github.com/miguel-montalvo1991/agenda-adso-api)

---

## 📄 Explicación de cada archivo nuevo

### `src/context/AuthContext.jsx`

Maneja el estado de autenticación de toda la aplicación usando Context API.

- `isAuthenticated` — indica si el usuario está autenticado
- `login()` — guarda la sesión en localStorage y actualiza el estado
- `logout()` — elimina la sesión de localStorage y actualiza el estado
- `useAuth()` — hook personalizado para consumir el contexto fácilmente

### `src/pages/Login.jsx`

Pantalla de login con diseño consistente con el dashboard. Valida las credenciales y redirige al dashboard si son correctas. Muestra mensaje de error si las credenciales son incorrectas.

### `src/components/ProtectedRoute.jsx`

Componente que protege rutas privadas. Si el usuario no está autenticado lo redirige a `/login`. Si sí está autenticado renderiza el componente hijo normalmente.

### `src/main.jsx`

Envuelve la app con `BrowserRouter` para habilitar el sistema de rutas y con `AuthProvider` para compartir el estado de autenticación en toda la aplicación.

### `src/App.jsx`

Define las rutas de la aplicación y separa el Dashboard en su propio componente interno.

- `/login` — ruta pública, pantalla de login
- `/` — ruta protegida con `ProtectedRoute`, muestra el Dashboard

---

## ✅ Funcionalidades

- Login con validación de credenciales
- Manejo de sesión con localStorage
- Rutas protegidas con React Router y Context API
- Botón de cerrar sesión en la barra superior
- Redirección automática al login si no hay sesión
- Cargar contactos desde la API remota en Render (GET)
- Agregar nuevos contactos (POST)
- Editar contactos existentes (PUT)
- Eliminar contactos (DELETE)
- Buscador en tiempo real
- Ordenamiento A–Z / Z–A
- Layout tipo dashboard con panel lateral

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
| v11 | Login, Context API y rutas protegidas |

---




```
docs(README): actualizar documentación a v11 con login y rutas protegidas - Clase 13