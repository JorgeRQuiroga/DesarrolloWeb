import React, { createContext, useReducer } from "react";

const KioskoContext = createContext();

const initialState = {
  ventas: 0,
  carrito: [],
  productos: [
    { id: 1, nombre: "Coca cola", precio: 1200 },
    { id: 2, nombre: "Fanta", precio: 800 }
  ]
};
function reducer(state, action) {
  switch (action.type) {
    case "agregarProducto":
      return { ...state, productos: [...state.productos, action.payload] };

    case "eliminarProducto":
      return {
        ...state,
        productos: state.productos.filter((p) => p.id !== action.payload),
      };

    case "agregarAlCarrito": {
      // Buscar si el producto ya está en el carrito
      const existe = state.carrito.find((p) => p.id === action.payload.id);

      if (existe) {
        // Si ya existe, aumentar la cantidad
        return {
          ...state,
          carrito: state.carrito.map((p) =>
            p.id === action.payload.id
              ? { ...p, cantidad: (p.cantidad || 1) + 1 }
              : p
          ),
        };
      } else {
        // Si no existe, agregarlo con cantidad = 1
        return {
          ...state,
          carrito: [...state.carrito, { ...action.payload, cantidad: 1 }],
        };
      }
    }

    case "actualizarCantidad":
      return {
        ...state,
        carrito: state.carrito.map((p) =>
          p.id === action.payload.id
            ? { ...p, cantidad: action.payload.cantidad }
            : p
        ),
      };

    case "eliminarDelCarrito":
      return {
        ...state,
        carrito: state.carrito.filter((p) => p.id !== action.payload),
      };

    case "cancelarCompra":
      return { ...state, carrito: [] };

    case "confirmarCompra": {
      const totalCompra = state.carrito.reduce(
        (sum, p) => sum + p.precio * (p.cantidad || 1),
        0
      );
      return { ...state, ventas: state.ventas + totalCompra, carrito: [] };
    }

    default:
      return state;
  }
}

export function KioskoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <KioskoContext.Provider value={{ state, dispatch }}>
      {children}
    </KioskoContext.Provider>
  );
}

export default KioskoContext;
