import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import KioskoContext from "../context/KioskoContext";

function ProductoDetalle() {
  const { id } = useParams();
  const { state } = useContext(KioskoContext);
  const navigate = useNavigate();

  const producto = state.productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="alert alert-danger mt-4">Producto no encontrado</div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-info text-white text-center">
          <h3 className="mb-0">Detalle del Producto</h3>
        </div>
        <div className="card-body">
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Stock disponible:</strong> {producto.stock}</p>
        </div>
        <div className="card-footer text-end">
          <button
            className="btn btn-warning"
            onClick={() => navigate(`/productos/${producto.id}/editar`)}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
