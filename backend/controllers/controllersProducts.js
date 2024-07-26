// Importa el modelo de Productos y el módulo multer
const Products = require("../models/products");
const multer = require("multer");

// Configuración de multer para el almacenamiento de archivos
const confMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads"); // Carpeta donde se almacenarán los archivos
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo
    },
  }),
  fileFilter(req, file, cb) {
    // Solo permite archivos con formato JPEG o PNG
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Error: Formato invalido."));
    }
  },
};

// Inicializa multer con la configuración anterior
const upload = multer(confMulter).single("img");

// Middleware para subir archivos
exports.uploadArchive = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).send({ Error: error.message });
    }
    next();
  });
};

// Controlador para crear un nuevo producto
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Products(req.body); // Crea una nueva instancia de producto con los datos del cuerpo de la solicitud
    if (req.file) {
      product.img = req.file.filename; // Si hay un archivo subido, establece la URL de la imagen del producto
    }
    await product.save(); // Guarda el producto en la base de datos
    res.json({ Mensaje: "Producto agregado." }); // Responde con un mensaje de éxito
  } catch (error) {
    console.error("Error al añadir producto", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para mostrar todos los productos
exports.showProducts = async (req, res, next) => {
  try {
    const productos = await Products.find({}); // Busca todos los productos en la base de datos
    res.send(productos); // Responde con la lista de productos
  } catch (error) {
    console.log("Error al mostrar productos :", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para mostrar un producto específico por su ID
exports.showProduct = async (req, res, next) => {
  try {
    const producto = await Products.findById({ _id: req.params.id }); // Busca un producto por su ID
    if (!producto) {
      res.json({ mensaje: "Producto no encontrado" }); // Responde con un mensaje si el producto no se encuentra
      next();
    }
    res.send(producto); // Responde con los detalles del producto encontrado
  } catch (error) {
    console.log("Error al buscar producto especifico :", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para eliminar un producto por su ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const delprod = await Products.findByIdAndDelete(req.params.id); // Elimina un producto por su ID
    if (!delprod) {
      res.json({ mensaje: "Producto no encontrado para remover." });
      next(); // Pasa al siguiente middleware si el producto no se encuentra
    }
    res.send("Producto removido."); // Responde con un mensaje de éxito
  } catch (error) {
    console.log("Error al eliminar producto :", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};

// Controlador para actualizar un producto por su ID
exports.updateProduct = async (req, res, next) => {
  try {
    const data = req.body;

    const productToUpdate = await Products.findByIdAndUpdate(
      { _id: req.params.id },
      data,
      { new: true } // Devuelve el documento actualizado
    );
    if (!productToUpdate) {
      res.json({ mensaje: "Producto no encontrado" }); // Responde con un mensaje si el producto no se encuentra
    }
    res.json({ mensaje: "Producto Actualizado", producto: productToUpdate }); // Responde con un mensaje de éxito y el producto actualizado
  } catch (error) {
    console.log("Error al actualizar Producto :", error);
    next(); // Pasa al siguiente middleware en caso de error
  }
};
