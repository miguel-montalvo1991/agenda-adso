// Archivo: server.js
// Crea un servidor con JSON Server que lee db.json
// y lo expone como API REST lista para Render.

// Importamos json-server declarado en package.json
const jsonServer = require("json-server");

// Creamos la app principal, similar a Express
const server = jsonServer.create();

// El router lee db.json y genera las rutas REST automáticamente
const router = jsonServer.router("db.json");

// Middlewares por defecto: logs, CORS, entre otros
const middlewares = jsonServer.defaults();

// Puerto: Render asigna PORT automáticamente, en local usamos 3000
const PORT = process.env.PORT || 3000;

// Activamos los middlewares
server.use(middlewares);

// Permitimos leer JSON en el body de las peticiones (POST, PUT, etc.)
server.use(jsonServer.bodyParser);

// Conectamos el router con las rutas de db.json
server.use(router);

// Iniciamos el servidor y confirmamos en consola
server.listen(PORT, () => {
  console.log(`JSON Server está corriendo en el puerto ${PORT}`);
});
