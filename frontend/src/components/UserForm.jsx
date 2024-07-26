import { useParams } from "react-router-dom";
import { Header } from "./header/Header";
import { useForm } from "react-hook-form";
import { RegisterUser, UpdateUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export function UserForm() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    if (id) {
      UpdateUser(id, data);
      navigate("/");
    } else {
      RegisterUser(data);
      navigate("/login");
    }
  });

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={onSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4"
        >
          {id ? (
            <h1 className="text-xl font-semibold text-center mb-4">
              Actualizar Usuario
            </h1>
          ) : (
            <h1 className="text-xl font-semibold text-center mb-4">
              Registrar Usuario
            </h1>
          )}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            {...register("nombre", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Apellido"
            {...register("apellido", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Correo"
            {...register("correo", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            {...register("contraseña", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            name="rol"
            id="rol"
            {...register("rol", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="vendedor">Vendedor</option>
          </select>
          {id ? (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Actualizar Usuario
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Registrar Usuario
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
