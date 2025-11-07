import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import KioskoContext from "../context/KioskoContext";

function NuevoProducto() {
  const { register, handleSubmit, reset } = useForm();
  const { dispatch } = useContext(KioskoContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const nuevoProducto = {
      id: Date.now(),
      nombre: data.nombre,
      precio: parseFloat(data.precio),
      stock: parseInt(data.stock, 10),
    };

    // ✅ Usamos dispatch en lugar de onAdd
    dispatch({ type: "agregarProducto", payload: nuevoProducto });

    reset();
    navigate("/Productos"); // volver a la lista de productos
  };

return (
  <div className="container mt-5">
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Agregar Producto</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              className="form-control"
              {...register("nombre", { required: true })}
              placeholder="Ej: Coca Cola"
            />
          </div>

          {/* Precio */}
          <div className="mb-3">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              {...register("precio", { required: true })}
              placeholder="Ej: 1500"
            />
          </div>

          {/* Stock */}
          <div className="mb-3">
            <label className="form-label">Stock:</label>
            <input
              type="number"
              min="0"
              className="form-control"
              {...register("stock", { required: true })}
              placeholder="Ej: 20"
            />
          </div>

          {/* Botón */}
          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);


}
export default NuevoProducto;
