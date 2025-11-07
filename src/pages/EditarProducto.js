import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import KioskoContext from "../context/KioskoContext";

function EditarProducto() {
  const { id } = useParams();
  const { state, dispatch } = useContext(KioskoContext);
  const navigate = useNavigate();

  const producto = state.productos.find((p) => p.id === parseInt(id));

  const { register, handleSubmit, setValue } = useForm();

  // Precargar valores
  if (producto) {
    setValue("nombre", producto.nombre);
    setValue("precio", producto.precio);
    setValue("stock", producto.stock);
  }

  const onSubmit = (data) => {
    dispatch({
      type: "editarProducto",
      payload: { id: producto.id, ...data }
    });
    navigate("/productos");
  };

  if (!producto) {
    return <div className="alert alert-danger mt-4">Producto no encontrado</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark">
          <h3 className="mb-0">✏️ Editar Producto</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" {...register("nombre")} />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input type="number" step="0.01" className="form-control" {...register("precio")} />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input type="number" min="0" className="form-control" {...register("stock")} />
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-success">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarProducto;
