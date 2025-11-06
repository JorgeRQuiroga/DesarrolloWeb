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
    <div>
      <h1>Detalle del Carrito</h1>
      {state.carrito.length > 0 ? (
        <ul>
          {state.carrito.map((item) => (
            <li key={item.id}>
              {item.nombre} - 
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) => actualizarCantidad(item.id, e.target.value)}
              /> 
              - ${item.precio * item.cantidad}
              <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío</p>
      )}
      <h2>Total general: ${totalGeneral}</h2>
      {state.carrito.length > 0 && (
        <button onClick={() => dispatch({ type: "confirmarCompra" })}>
          Confirmar Venta
        </button>
      )}
    </div>
  );
}

export default DetalleCarrito;
