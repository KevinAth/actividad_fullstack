// Importa el modelo de usuarios ('Users'), el módulo 'jsonwebtoken' y 'bcrypt' para el hashing de contraseñas
const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Controlador para registrar un nuevo usuario
exports.RegisterUser = async (req, res, next) => {
  // Extrae los datos del cuerpo de la solicitud (nombre, apellido, correo, contraseña, rol)
  const { nombre, apellido, correo, contraseña, rol } = req.body;
  try {
    // Hashea la contraseña antes de guardarla en la base de datos
    const codPassword = await bcrypt.hash(contraseña, 10);

    // Crea un nuevo documento de usuario con los datos proporcionados
    const newUser = new Users({
      nombre,
      apellido,
      contraseña: codPassword,
      correo,
      rol,
    });

    // Guarda el nuevo usuario en la base de datos
    await newUser.save();

    // Envía una respuesta de éxito con un mensaje indicando el correo del usuario registrado
    res.status(201).send(`Usuario ${correo} registrado correctamente`);
  } catch (error) {
    // Captura cualquier error y devuelve un mensaje de error al cliente
    res.status(500).send("Error al registrar usuario :", error);
    next();
  }
};

// Controlador para autenticar y realizar el login de un usuario
exports.LoginUser = async (req, res, next) => {
  // Extrae los datos del cuerpo de la solicitud (correo, contraseña)
  const { contraseña, correo } = req.body;
  try {
    // Busca un usuario en la base de datos por su correo electrónico
    const user = await Users.findOne({ correo });

    // Si no se encuentra ningún usuario con el correo proporcionado, devuelve un error
    if (!user) {
      return res.status(400).send("Nombre de usuario o contraseña incorrectos");
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const password = await bcrypt.compare(contraseña, user.contraseña);

    // Si las contraseñas no coinciden, devuelve un error
    if (!password) {
      return res.status(400).send("Nombre de usuario o contraseña incorrectos");
    }

    // Si la autenticación es exitosa, genera un token JWT con el ID del usuario y una clave secreta
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });

    // Devuelve el token JWT al cliente como respuesta
    res.status(200).json({ token, id: user.id });
  } catch (error) {
    // Captura cualquier error y llama al siguiente middleware
    console.log("Error en login", error);
    next();
  }
};

// Controlador para actualizar los datos de un usuario
exports.updateUser = async (req, res, next) => {
  // Obtiene los datos actualizados del cuerpo de la solicitud
  const data = req.body;
  try {
    // Si se proporciona una nueva contraseña, se hashea antes de actualizarla
    if (data.contraseña) {
      data.contraseña = await bcrypt.hash(data.contraseña, 10);
    }

    // Busca y actualiza el usuario por su ID, con los datos actualizados
    const user = await Users.findByIdAndUpdate({ _id: req.params.id }, data, {
      new: true, // Devuelve el documento actualizado
    });

    // Si no se encuentra ningún usuario con el ID proporcionado, devuelve un error
    if (!user) {
      res.json({ Error: "Usuario no encontrado" });
    }

    // Si la actualización es exitosa, devuelve un mensaje de éxito
    res.send("Usuario Actualizado");
  } catch (error) {
    // Captura cualquier error y llama al siguiente middleware
    console.error(error);
    next();
  }
};
