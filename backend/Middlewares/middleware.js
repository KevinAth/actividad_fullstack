// Importa el módulo 'jsonwebtoken' para trabajar con JWT
const jwt = require("jsonwebtoken");

// Define el middleware de autenticación ('authMiddleware')
const authMiddleware = (req, res, next) => {
  // Obtiene el encabezado 'Authorization' de la solicitud
  const authHeader = req.header("Authorization");

  // Verifica si el encabezado 'Authorization' existe y comienza con 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Si no existe o no comienza con 'Bearer ', devuelve un error de acceso denegado (401)
    return res
      .status(401)
      .json({ error: "Acceso denegado, token no proporcionado" });
  }

  // Extrae el token JWT eliminando el prefijo 'Bearer '
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verifica y decodifica el token JWT utilizando la clave secreta "secret_key"
    const decoded = jwt.verify(token, "secret_key");

    // Asigna el objeto decodificado (que contiene la información del usuario) a 'req.user'
    req.user = decoded;

    // Llama a la función 'next()' para pasar al siguiente middleware o ruta
    next();
  } catch (error) {
    // Captura cualquier error que ocurra durante la verificación del token y devuelve un error de token no válido (400)
    res.status(400).json({ error: "Token no válido" });
  }
};

// Exporta el middleware de autenticación para que pueda ser utilizado en otras partes de la aplicación
module.exports = authMiddleware;
