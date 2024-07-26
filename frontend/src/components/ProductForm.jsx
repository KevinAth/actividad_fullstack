import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DeleteProducts, PostProducts, PutProducts } from "../api/api";
import { Header } from "./header/Header";

export function ProductForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  
  const OnSubmit = handleSubmit((data) => {
    if (id) {
      PutProducts(id, data);
      console.log(data);
      navigate("/");
    } else {
      data.img = data.img[0];
      PostProducts(data)
        .then(() => {
          console.log("Datos enviados correctamente");
          navigate("/");
          console.log(data);
        })
        .catch((error) => {
          console.error("Error al enviar los datos", error);
        });
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md m-5">
        <form onSubmit={OnSubmit} className="space-y-4">
          <h1 className="text-2xl font-semibold mb-4">{id ? 'Actualizar Producto' : 'Agregar Producto'}</h1>
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Descripción"
            {...register("descripcion", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Precio"
            {...register("precio", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Cantidad"
            {...register("cantidad", { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {!id && (
            <input
              type="file"
              {...register("img")}
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </form>
        {id && (
          <button
            onClick={() => {
              DeleteProducts(id);
              navigate("/");
            }}
            className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}
