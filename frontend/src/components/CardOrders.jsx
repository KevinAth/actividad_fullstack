import { Link } from "react-router-dom";


export function CardOrders({ order }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <Link
        to={`/order/${order._id}`}
        className="text-blue-500 hover:underline"
      >
        <h1 className="text-xl font-semibold mb-2">{order.nombreCliente}</h1>
      </Link>
      <p className="text-gray-700 mb-2">{order.correoCliente}</p>
      <ul className="list-disc list-inside mb-2">
        {order.items.map((prod, index) => (
          <li key={index} className="text-gray-700">
            {prod}
          </li>
        ))}
      </ul>
      <strong>
        <p className="text-lg font-bold mb-2">${order.total}.00</p>
      </strong>
      <p
        className={`mb-2 ${
          order.status === "Pending" ? "text-yellow-500" : "text-green-500"
        }`}
      >
        {order.status}
      </p>
      <p className="text-gray-500">
        {new Date(order.createdAt).toLocaleDateString()}
      </p>
      <hr className="mt-4" />
    </div>
  );
}
