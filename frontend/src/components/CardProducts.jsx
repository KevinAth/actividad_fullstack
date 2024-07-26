import { Link } from "react-router-dom";

export function CardProducts({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 max-w-sm mx-auto">
      <img
        src={`http://localhost:5000/uploads/${product.img}`}
        alt={product.nombre}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <Link
          to={`/product/${product._id}`}
          className="text-blue-600 hover:underline"
        >
          <h2 className="text-xl font-semibold mb-2">{product.nombre}</h2>
        </Link>
        <p className="text-gray-700 mb-2">{product.descripcion}</p>
        <p className="text-gray-600 mb-2">Cantidad: {product.cantidad}</p>
        <p className="text-gray-800 font-bold text-lg mb-2">
          ${product.precio}
        </p>
        <hr className="my-4 border-gray-200" />
      </div>
    </div>
  );
}
