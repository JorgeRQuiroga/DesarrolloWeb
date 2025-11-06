import React, { useContext } from "react";
import KioskoContext from "../context/KioskoContext";

function DetalleCarrito() {
  const { state, dispatch } = useContext(KioskoContext);

  const actualizarCantidad = (id, cantidad) => {
    dispatch({ type: "actualizarCantidad", payload: { id, cantidad: parseInt(cantidad) } });
  };

  const eliminarProducto = (id) => {
    dispatch({ type: "eliminarDelCarrito", payload: id });
  };

  const totalGeneral = state.carrito.reduce(
    (sum, p) => sum + p.precio * (p.cantidad || 1),
    0
  );

return (
  <div className="container mt-4">
    <div className="card shadow">
      <div className="card-header bg-dark text-white">
        <h3 className="mb-0">🛒 Detalle del Carrito</h3>
      </div>
      <div className="card-body">
        {state.carrito.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th style={{ width: "120px" }}>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {state.carrito.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.nombre}</strong></td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        className="form-control form-control-sm text-center"
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarCantidad(item.id, e.target.value)
                        }
                      />
                    </td>
                    <td>${item.precio * item.cantidad}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        X Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-warning text-center">
            El carrito está vacío
          </div>
        )}

        <h4 className="mt-3 text-end">
          Total general: <span className="text-success">${totalGeneral}</span>
        </h4>
      </div>
      {state.carrito.length > 0 && (
        <div className="card-footer text-end">
          <button
            className="btn btn-success"
            onClick={() => dispatch({ type: "confirmarCompra" })}
          >
          Confirmar Venta
          </button>
        </div>
      )}
    </div>
  </div>
);

}

export default DetalleCarrito;
