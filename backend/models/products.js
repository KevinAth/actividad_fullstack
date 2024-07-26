// Importa el módulo mongoose
const mongoose = require("mongoose");

// Crea un esquema utilizando mongoose
const Schema = mongoose.Schema;

// Define el esquema para los productos
const productSchema = new Schema({
  // Nombre del producto
  nombre: {
    type: String,
    require: true, // Campo requerido
    lowercase: true, // Convertir a minúsculas
  },
  // Descripción del producto
  descripcion: {
    type: String,
    lowercase: true, // Convertir a minúsculas
  },
  // Precio del producto
  precio: {
    type: Number,
    require: true, // Campo requerido
  },
  // Cantidad disponible del producto
  cantidad: {
    type: Number,
    default: 1, // Valor por defecto
  },
  // URL de la imagen del producto
  img: {
    type: String,
    default: "place.png", // Valor por defecto
  },
});

// Exporta el modelo de producto utilizando el esquema definido
module.exports = mongoose.model("products", productSchema);
