// Importa el módulo Express
const express = require("express");
// Crea un enrutador utilizando Express
const router = express.Router();

// Importa las funciones controladoras desde el archivo 'controllersProducts'
const {
  uploadArchive,
  createProduct,
  showProducts,
  showProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/controllersProducts");

// Exporta una función que configura las rutas del enrutador
module.exports = () => {
  // Define una ruta POST para crear un nuevo producto, primero sube un archivo
  router.post("/products", uploadArchive, createProduct);

  // Define una ruta GET para obtener todos los productos
  router.get("/products", showProducts);

  // Define una ruta GET para obtener los detalles de un producto específico por su ID
  router.get("/products/:id", showProduct);

  // Define una ruta DELETE para eliminar un producto específico por su ID
  router.delete("/products/:id", deleteProduct);

  // Define una ruta PUT para actualizar un producto específico por su ID
  router.put("/products/:id", updateProduct);

  // Retorna el enrutador configurado
  return router;
};
