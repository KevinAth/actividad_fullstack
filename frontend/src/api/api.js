import axios from "axios";

const conexion = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// Solicitudes de Productos

export const GetProducts = () => conexion.get("/products");

export const PostProducts = async (data) =>
  await conexion.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const PutProducts = async (id, data) =>
  await conexion.put(`/products/${id}`, data);

export const DeleteProducts = (id) => conexion.delete(`/products/${id}`);

// Solicitudes de Ordenes

export const GetOrders = () => conexion.get("/order");

export const PostOrders = (data) => conexion.post("/order", data);

export const DeleteOrder = (id) => conexion.delete(`/order/${id}`);

export const PutOrder = (id, data) => conexion.put(`/order/${id}`, data);

// Solicitudes de usuarios/users

export const LoginUser = (data) => conexion.post("/login", data);

export const RegisterUser = (data) => conexion.post("/register", data);

export const UpdateUser = (id, data) => conexion.put(`/update/${id}`, data);

conexion.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // Agregar el token al encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
