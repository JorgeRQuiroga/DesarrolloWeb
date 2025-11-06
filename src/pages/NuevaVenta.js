import React, { useContext } from "react";
import KioskoContext from "../context/KioskoContext";

function NuevaVenta() {
  const { state, dispatch } = useContext(KioskoContext);

  // Calcular subtotal del carrito
const subtotal = state.carrito.reduce(
  (sum, p) => sum + p.precio * (p.cantidad || 1),
  0
);
  // Calcula la cantidad de productos en el carrito
  const totalItems = state.carrito.reduce(
    (sum, p) => sum + (p.cantidad || 1),
    0
  );

return (
  <div className="container mt-4">
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">🛒 Resumen de la Venta</h3>
      </div>
      <div className="card-body">
        <p className="mb-1">
          <strong>Productos en carrito actual:</strong> {totalItems}
        </p>
        <p className="mb-3">
          <strong>Subtotal carrito:</strong> ${subtotal}
        </p>

        <h5 className="mt-4">Productos disponibles</h5>
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
                className="btn btn-sm btn-success"
                onClick={() =>
                  dispatch({ type: "agregarAlCarrito", payload: { ...prod, cantidad: 1 } })
                }
              >
              Agregar
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer text-end">
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: "confirmarCompra" })}
        >
          Confirmar Venta
        </button>
        <button
          className="btn btn-outline-danger ms-2"
          onClick={() => dispatch({ type: "cancelarCompra" })}
        >
          X Cancelar
        </button>
      </div>
    </div>
  </div>
);

}

export default NuevaVenta;
