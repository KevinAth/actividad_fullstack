import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Administrador de datos</h2>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-gray-300">
              Ordenes
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-gray-300">
              Usuarios
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
