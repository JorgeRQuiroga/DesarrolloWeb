import React, { useContext } from "react";
import KioskoContext from "../context/KioskoContext";
import { useNavigate } from "react-router-dom";

function Productos() {
  const { state, dispatch } = useContext(KioskoContext);
  const navigate = useNavigate();

  const eliminarProducto = (id) => {
    dispatch({ type: "eliminarProducto", payload: id });
  };

return (
  <div className="container mt-4">
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Lista de Productos</h3>
      </div>
      <div className="card-body">
        {state.productos && state.productos.length > 0 ? (
          <ul className="list-group">
            {state.productos.map((prod) => (
              <li
                key={prod.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{prod.nombre}</strong> <span className="text-muted">- ${prod.precio}</span>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  X Eliminar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-warning mt-3">
            No hay productos disponibles
          </div>
        )}
      </div>
      <div className="card-footer text-end">
        <button
          className="btn btn-success"
          onClick={() => navigate("/Productos/NuevoProducto")}
        >
          Agregar Producto
        </button>
      </div>
    </div>
  </div>
);

}

export default Productos;