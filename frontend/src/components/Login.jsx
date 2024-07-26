import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../api/api";

export function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    LoginUser(data).then((valor) => {
      navigate(`/update/${valor.data.id}`);
      localStorage.setItem("authToken", valor.data.token);
    });
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4"
      >
        <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
        <input
          type="text"
          placeholder="Correo Electrónico"
          {...register("correo", { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("contraseña", { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>¿No tienes cuenta?</p>
        <button
          onClick={() => navigate("/register")}
          className="text-blue-500 hover:underline"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
}
