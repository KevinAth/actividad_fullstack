// Importa el módulo Express
const express = require("express");

// Crea un enrutador utilizando Express
const router = express.Router();

// Importa las funciones controladoras desde el archivo 'controllersOrders'
const {
  createOrder,
  deleteOrder,
  showOrder,
  showOrders,
  updateOrder,
} = require("../controllers/controllersOrders");

// Exporta una función que configura las rutas del enrutador
module.exports = () => {
  // Define una ruta POST para crear una nueva orden
  router.post("/order", createOrder);

  // Define una ruta GET para obtener los detalles de una orden específica por su ID
  router.get("/order/:id", showOrder);

  // Define una ruta GET para obtener todas las órdenes
  router.get("/order", showOrders);

  // Define una ruta PUT para actualizar una orden específica por su ID
  router.put("/order/:id", updateOrder);

  // Define una ruta DELETE para eliminar una orden específica por su ID
  router.delete("/order/:id", deleteOrder);

  // Retorna el enrutador configurado
  return router;
};
