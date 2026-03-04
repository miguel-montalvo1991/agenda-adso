# 📒 Agenda ADSO v5 – API REST con JSON Server

Proyecto desarrollado en el SENA CTMA como parte del programa de Análisis y Desarrollo de Software (ADSO).  
Esta es la versión 5 de la Agenda ADSO, donde se integró JSON Server como API REST local para reemplazar el localStorage y conectar la aplicación a un backend simulado.

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
    ├── api.js                     ← funciones GET, POST y DELETE
    ├── App.jsx                    ← componente principal
    ├── main.jsx                   ← punto de entrada
    ├── index.css                  ← estilos globales con Tailwind
    └── components/
        ├── FormularioContacto.jsx ← formulario para agregar contactos
        └── ContactoCard.jsx       ← tarjeta de cada contacto
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

Es la base de datos local que usa JSON Server. Cada clave del objeto se convierte en un endpoint de la API. En este caso `contactos` queda disponible en `http://localhost:3002/contactos`.

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

Centraliza todas las peticiones HTTP hacia la API. Separa la lógica de comunicación con el servidor de los componentes React.

- `listarContactos()` — hace un GET y retorna el array de contactos
- `crearContacto(data)` — hace un POST con los datos del formulario
- `eliminarContactoPorId(id)` — hace un DELETE al endpoint con el id específico

---

### `src/App.jsx`

Componente principal que maneja el estado global de la app y coordina las operaciones con la API.

- `useState([])` — guarda la lista de contactos
- `useState(true)` — controla el mensaje de carga
- `useState("")` — guarda mensajes de error
- `useEffect` — carga los contactos desde la API al iniciar la app
- `agregarContacto` — llama a `crearContacto()` y actualiza el estado
- `eliminarContacto` — llama a `eliminarContactoPorId()` y filtra el estado

---

### `src/components/FormularioContacto.jsx`

Maneja el formulario para agregar nuevos contactos. Controla su propio estado local con los campos nombre, teléfono, correo, empresa y etiqueta.

- `onChange` — actualiza el campo correspondiente cada vez que el usuario escribe
- `onSubmit` — valida los campos obligatorios, llama al padre y limpia el formulario
- El grid de 2 columnas se adapta automáticamente en móvil y escritorio con Tailwind

---

### `src/components/ContactoCard.jsx`

Muestra la información de un contacto en una tarjeta. Recibe los datos como props y tiene un botón para eliminar que llama a la función del padre con el id del contacto.

- Solo muestra empresa y etiqueta si tienen valor
- El botón eliminar pasa el id para identificar qué contacto borrar en la API

---

### `src/main.jsx`

Punto de entrada de la app. Renderiza el componente `App` dentro del `div#root` del HTML e importa el CSS global con Tailwind.

---

### `src/index.css`

Activa las tres capas de Tailwind y define los estilos globales del body.

---

### `tailwind.config.js`

Configura Tailwind indicando dónde buscar las clases y define los colores personalizados del proyecto ADSO.

---

### `postcss.config.js`

Registra Tailwind y Autoprefixer como plugins de PostCSS para que los estilos se procesen correctamente.

---

## ✅ Funcionalidades

- Cargar contactos desde la API al iniciar la app (GET)
- Agregar nuevos contactos desde el formulario (POST)
- Eliminar contactos de la lista y la API (DELETE)
- Mostrar mensajes de carga y error
- Campo empresa como actividad complementaria
- Diseño responsivo con TailwindCSS

---

## 📸 Evidencias requeridas (Classroom)

1. Captura de la terminal con JSON Server encendido
2. Captura de la lista de contactos cargada desde la API
3. Captura de un contacto agregado desde React
4. Captura de un contacto eliminado correctamente

---

## 👨‍💻 Autor

Aprendiz SENA – ADSO  
Ficha: ___  
Instructor: Gustavo Bolaños  
Centro: CTMA – Regional Antioquia