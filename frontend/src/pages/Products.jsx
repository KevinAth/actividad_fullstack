import { Link } from "react-router-dom";
import { GetProducts } from "../api/api";
import { CardProducts } from "../components/CardProducts";
import { Header } from "../components/header/Header";
import { useEffect, useState } from "react";

export function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await GetProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error al cargar los productos", error);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="max-w-7xl  min-h-screen mx-auto p-4">
        <Link to="/addproduct">
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
            Agregar producto
          </button>
        </Link>
        <div className="grid grid-cols-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <CardProducts key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
