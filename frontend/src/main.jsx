import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Products } from "./pages/Products.jsx";
import { Users } from "./pages/Users.jsx";
import { Orders } from "./pages/Orders.jsx";
import { ProductForm } from "./components/ProductForm.jsx";
import { OrdersForm } from "./components/OrderForm.jsx";
import { UserForm } from "./components/UserForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/addproduct",
    element: <ProductForm />,
  },
  {
    path: "/product/:id",
    element: <ProductForm />,
  },
  {
    path: "/addorder",
    element: <OrdersForm />,
  },
  {
    path: "/order/:id",
    element: <OrdersForm />,
  },
  {
    path: "/update/:id",
    element: <UserForm />,
  },
  {
    path: "/register",
    element: <UserForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
