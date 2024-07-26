// Importa el módulo mongoose y el objeto Schema de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define un nuevo esquema llamado 'usersSchema' utilizando el objeto Schema de mongoose
const usersSchema = new Schema({
  // Define el campo 'nombre' como tipo String y obligatorio (require: true)
  nombre: { type: String, require: true },

  // Define el campo 'apellido' como tipo String (no obligatorio)
  apellido: { type: String },

  // Define el campo 'correo' como tipo String, con configuraciones adicionales:
  correo: {
    type: String,
    trim: true, // Elimina espacios en blanco al inicio y final del valor
    unique: true, // Debe ser único en la colección
    lowercase: true, // Convierte a minúsculas
    require: true, // Obligatorio
  },

  // Define el campo 'contraseña' como tipo String y obligatorio, con un mínimo de 8 caracteres
  contraseña: { type: String, require: true, minlength: 8 },

  // Define el campo 'rol' como tipo String, con configuraciones adicionales:
  rol: {
    type: String,
    lowercase: true, // Convierte a minúsculas
    enum: ["usuario", "admin", "vendedor"], // Debe ser uno de los valores especificados
    default: "usuario", // Valor por defecto si no se especifica otro
  },
});

// Exporta el modelo 'users' basado en el esquema 'usersSchema' para que pueda ser utilizado en otras partes de la aplicación
module.exports = mongoose.model("users", usersSchema);
