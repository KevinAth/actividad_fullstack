import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Header } from "./header/Header";
import { PostOrders, GetProducts, DeleteOrder, PutOrder } from "../api/api";
import { useEffect, useState } from "react";

export function OrdersForm() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await GetProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("error en vista de prods", error);
      }
    }
    loadProducts();
  }, []);

  const addItem = (newItem, price) => {
    setItems((prevItems) => [...prevItems, newItem]);
    let sum = total + price;
    setTotal(sum);
  };

  const findbyid = (id) => {
    const name = products.find((prod) => prod._id === id);
    const prod = { nombre: name.nombre, precio: name.precio };
    return prod;
  };
  const deleteitem = (index, tt) => {
    const itemsx = items.filter((_, indexof) => indexof !== index);
    setItems(itemsx);
    const res = total - tt;
    setTotal(res);
  };

  const { register, handleSubmit } = useForm();
  const { id } = useParams();

  const OnSubmit = handleSubmit((data) => {
    const datos = {
      nombreCliente: data.nombreCliente,
      correoCliente: data.correoCliente,
      items: items,
      total: total,
      status: data.status,
    };

    if (id) {
      PutOrder(id, datos);
      navigate("/orders");
    } else {
      PostOrders(datos)
        .then(() => {
          navigate("/orders");
        })
        .catch((error) => {
          console.error("Error al enviar los datos", error);
        });
    }
  });
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <form
          onSubmit={OnSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4"
        >
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombreCliente", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Correo"
            {...register("correoCliente")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="font-semibold">Productos</p>
          <ul className="list-disc list-inside mb-2">
            {items.map((order, index) => (
              <div key={index} className="flex justify-between">
                <li>{findbyid(order).nombre}</li>
                <input type="hidden" {...register("items")} value={order} />
                <button
                  onClick={() => deleteitem(index, findbyid(order).precio)}
                >
                  Borrar
                </button>
              </div>
            ))}
          </ul>
          <p className="font-bold">Total: {total}</p>
          <input type="hidden" {...register("total")} value={total} />
          <select
            name="status"
            id="status"
            {...register("status")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="pendiente">Pendiente</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Guardar
          </button>
          {id && (
            <button
              onClick={() => {
                DeleteOrder(id);
                navigate("/orders");
              }}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4"
            >
              Borrar
            </button>
          )}
        </form>
        <div className="grid grid-cols-6 m-10 ">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="bg-white p-4 rounded-lg shadow-md mb-2 m-2"
            >
              <h1 className="text-xl font-semibold mb-2">{prod.nombre}</h1>
              <strong>
                <p className="text-lg font-bold">{prod.precio}</p>
              </strong>
              <button
                onClick={() => addItem(prod._id, prod.precio)}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2"
              >
                Agregar Producto
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
