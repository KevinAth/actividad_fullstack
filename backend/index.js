// Importa los módulos necesarios: express, mongoose y las rutas definidas en "./routes/routes"
const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRouter");
const midd = require("./Middlewares/middleware");
const ordersRouter = require("./routes/ordersRouter");
const cors = require("cors");
const path = require("path");

// Configura la promesa global de Mongoose para usar Promises nativas de JavaScript
mongoose.Promise = global.Promise;

// Define el número de puerto en el que la aplicación Express va a escuchar
const port = 5000;

// Conecta a la base de datos MongoDB local en el puerto 27017 y la base de datos 'dbusers'
mongoose
  .connect("mongodb://localhost:27017/database")
  .then(console.log("Conectado a base de datos:Mongodb"))
  .then(console.log(`Base conectada en el puerto:${port}`)) // Mensaje de éxito al conectar
  .catch(
    (error) => console.error("Error al conectarce a base de datos :", error) // Manejo de error al conectar
  );

// Crea una instancia de la aplicación Express
const app = express();

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configura la aplicación Express para usar JSON como formato de datos
app.use(express.json());

// Configura la aplicación Express para poder parsear datos de URL codificados
app.use(express.urlencoded({ extended: true }));

// Utiliza el middleware 'routes' importado para manejar las rutas de la aplicación
app.use("/", usersRoutes());

app.use("/", productsRoutes());

app.use("/", ordersRouter());

// Hace que la aplicación Express escuche en el puerto especificado
app.listen(port, () => {
  console.log("Servidor corriendo correctamente"); // Mensaje de éxito al iniciar el servidor
});
