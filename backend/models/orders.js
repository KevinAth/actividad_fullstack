// Importa el módulo mongoose
const mongoose = require("mongoose");

// Crea un esquema utilizando mongoose
const Schema = mongoose.Schema;

// Define el esquema para las órdenes
const OrdersSchema = new Schema({
  // Nombre del cliente
  nombreCliente: {
    type: String,
    require: true,  // Campo requerido
  },
  // Correo electrónico del cliente
  correoCliente: {
    type: String,
    require: true,  // Campo requerido
    lowercase: true,  // Convertir a minúsculas
  },
  // Items de la orden
  items: [
    {
      type: Schema.ObjectId,
      ref: "products",  // Referencia a la colección de productos
      require: true,  // Campo requerido
    },
  ],
  // Total de la orden
  total: {
    type: Number,
    require: true,  // Campo requerido
  },
  // Estado de la orden
  status: {
    lowercase: true,  // Convertir a minúsculas
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],  // Valores permitidos
    default: "pendiente",  // Valor por defecto
  },
  // Fecha de creación de la orden
  createdAt: { type: Date, default: Date.now },  // Valor por defecto es la fecha y hora actual
});

// Exporta el modelo de la orden utilizando el esquema definido
module.exports = mongoose.model("orders", OrdersSchema);
