import { GetOrders } from "../api/api";
import { CardOrders } from "../components/CardOrders";
import { Header } from "../components/header/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [itemsz, setItemsz] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await GetOrders();
        setOrders(res.data);
      } catch (error) {
        console.error("error en vista de prods", error);
      }
    }
    loadOrders();
  });

  return (
    <div>
      <Header />
      <div>
        <Link to="/addorder">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 m-2">
            Realizar Orden
          </button>
        </Link>
        <div>
          {orders.map((order) => (
            <div key={order._id}>
              <CardOrders order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
