// Importa el modelo de Ordenes
const Orders = require("../models/orders");

// Controlador para crear una nueva orden
exports.createOrder = async (req, res, next) => {
  try {
    const order = new Orders(req.body); // Crea una nueva instancia de orden con los datos del cuerpo de la solicitud
    await order.save(); // Guarda la orden en la base de datos
    res.json({ mensaje: "Orden creada." }); // Responde con un mensaje de éxito
  } catch (error) {
    console.log("Error al añadir :", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para mostrar todas las órdenes
exports.showOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({}); // Busca todas las órdenes en la base de datos
    res.send(orders); // Responde con la lista de órdenes
  } catch (error) {
    console.log("Error al mostrar pedidos:", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para mostrar una orden específica por su ID
exports.showOrder = async (req, res, next) => {
  try {
    const order = await Orders.findById({ _id: req.params.id }); // Busca una orden por su ID
    if (!order) {
      res.json({ Mensaje: "Pedido no encontrado" }); // Responde con un mensaje si la orden no se encuentra
      next(); // Pasa al siguiente middleware
    } else {
      res.send(order); // Responde con los detalles de la orden encontrada
    }
  } catch (error) {
    console.log("Error al mostrar pendiente :", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para eliminar una orden por su ID
exports.deleteOrder = async (req, res, next) => {
  try {
    const delOrder = await Orders.findByIdAndDelete({ _id: req.params.id }); // Elimina una orden por su ID
    if (!delOrder) {
      res.json({ Error: "Orden no encontrada." }); // Responde con un mensaje si la orden no se encuentra
      next(); // Pasa al siguiente middleware
    } else {
      res.json({ mensaje: "Orden borrada." }); // Responde con un mensaje de éxito
    }
  } catch (error) {
    console.log("Error al borrar Producto", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para actualizar una orden por su ID
exports.updateOrder = async (req, res, next) => {
  const data = req.body; // Obtiene los datos del cuerpo de la solicitud

  try {
    const orderToUpdate = await Orders.findByIdAndUpdate(
      { _id: req.params.id },
      data,
      { new: true } // Devuelve el documento actualizado
    );

    if (!orderToUpdate) {
      res.json({ mensaje: "Pendiente no encontrada para actualizar." }); // Responde con un mensaje si la orden no se encuentra
    } else {
      console.log(data);
      res.json({ mensaje: "Pendiente actualizada." }); // Responde con un mensaje de éxito
    }
  } catch (error) {
    console.log("Error al actualizar pendiente :", error);
    next();
  }
};
