# 📒 Agenda ADSO v8 – Búsqueda y Ordenamiento

Proyecto desarrollado en el SENA CTMA como parte del programa de Análisis y Desarrollo de Software (ADSO).  
Esta es la versión 8 de la Agenda ADSO, donde se implementaron funcionalidades de búsqueda en tiempo real y ordenamiento alfabético A–Z / Z–A para mejorar la experiencia del usuario al trabajar con listas de contactos extensas.

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
    ├── config.js                  ← configuración global de la app (APP_INFO)
    ├── App.jsx                    ← componente principal (actualizado v8)
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

Centraliza todas las peticiones HTTP hacia la API. Separa la lógica de comunicación del servidor de los componentes React.

- `listarContactos()` — hace un GET y retorna el array de contactos
- `crearContacto(data)` — hace un POST con los datos del formulario
- `eliminarContactoPorId(id)` — hace un DELETE al endpoint con el id específico

---

### `src/config.js`

Archivo de configuración global. Exporta `APP_INFO` con los datos del proyecto (título, subtítulo, ficha, etc.) para no tener esos datos regados por todo el código.

---

### `src/App.jsx` ← actualizado en v8

Componente principal. Maneja el estado global y ahora también incluye la lógica de búsqueda y ordenamiento.

**Estados que maneja:**
- `contactos` — lista de contactos cargada desde la API
- `cargando` — controla el mensaje de carga inicial
- `error` — guarda mensajes de error para mostrarle al usuario
- `busqueda` *(nuevo v8)* — guarda el texto que escribe el usuario en el buscador
- `ordenAsc` *(nuevo v8)* — controla si la lista va de A–Z (`true`) o Z–A (`false`)

**Lógica nueva en v8:**
- `contactosFiltrados` — aplica `.filter()` sobre `contactos` buscando el término en nombre, correo, teléfono y etiqueta
- `contactosOrdenados` — aplica `.sort()` sobre `contactosFiltrados` usando el estado `ordenAsc`
- El JSX ya no recorre `contactos` directamente, sino `contactosOrdenados`

---

### `src/components/FormularioContacto.jsx`

Formulario para agregar nuevos contactos. Controla su propio estado local con los campos nombre, teléfono, correo y etiqueta.

- `onChange` — actualiza el campo correspondiente mientras el usuario escribe
- `onSubmit` — valida los campos obligatorios, llama al padre y limpia el formulario

---

### `src/components/ContactoCard.jsx`

Muestra la información de un contacto en una tarjeta. Recibe los datos como props y tiene un botón eliminar que llama a la función del padre.

- Solo muestra etiqueta si tiene valor
- El botón eliminar identifica el contacto por su id

---

### `src/main.jsx`

Punto de entrada de la app. Renderiza el componente `App` dentro del `div#root` e importa el CSS global con Tailwind.

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
- Eliminar contactos de la lista y la API (DELETE)
- Mostrar mensajes de carga y error
- Diseño responsivo con TailwindCSS
- **Buscador en tiempo real** por nombre, correo, teléfono y etiqueta *(nuevo v8)*
- **Ordenamiento A–Z / Z–A** con botón para alternar *(nuevo v8)*
- Mensaje cuando el filtro no encuentra resultados *(nuevo v8)*
- **Contador de resultados** que muestra cuántos contactos coinciden con la búsqueda *(mini reto v8)*

---


---


---

## 👨‍💻 Autor

Aprendiz SENA – ADSO  
Ficha: 3229209
Instructor: Gustavo Bolaños  
Centro: CTMA – Regional Antioquia