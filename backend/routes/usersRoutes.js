// Importa el módulo 'express' y crea una instancia de Router
const express = require("express");
const router = express.Router();

// Importa un middleware desde el archivo "../Middlewares/middleware"
const midd = require("../Middlewares/middleware");

// Importa funciones específicas desde el archivo "../controllers/controllersRegister"
const {
  RegisterUser,
  LoginUser,
  updateUser,
} = require("../controllers/controllersUsers");

// Exporta una función anónima que configura las rutas y las devuelve
module.exports = () => {
  // Define una ruta POST "/Register" que llama a la función RegisterUser
  router.post("/register", RegisterUser);

  // Define una ruta POST "/Login" que llama a la función LoginUser
  router.post("/login", LoginUser);

  // Define una ruta put "/Update/:id" que primero utiliza el middleware 'midd'
  // y luego llama a la función updateUser
  router.put("/update/:id", midd, updateUser);

  // Devuelve el enrutador configurado
  return router;
};
