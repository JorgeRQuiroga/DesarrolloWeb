import React, { createContext, useReducer } from "react";

const KioskoContext = createContext();

const initialState = {
  ventas: 0,
  carrito: [],
  productos: [
    { id: 1, nombre: "Coca cola", precio: 1200, stock: 20 },
    { id: 2, nombre: "Fanta", precio: 800, stock: 15 }
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
    case "editarProducto":
      return {
        ...state,
        productos: state.productos.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    case "agregarAlCarrito": {
      const producto = action.payload;
      const existente = state.carrito.find((p) => p.id === producto.id);

      if (existente) {
        // Si ya está en el carrito, comprobar stock
        if (existente.cantidad + 1 > producto.stock) {
          alert("⚠️ No hay más stock disponible de " + producto.nombre);
          return state; // no modifica nada
        }
        return {
          ...state,
          carrito: state.carrito.map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
          ),
        };
      } else {
        // Primer ingreso al carrito
        if (producto.stock < 1) {
          alert("⚠️ No hay stock disponible de " + producto.nombre);
          return state;
        }
        return {
          ...state,
          carrito: [...state.carrito, { ...producto, cantidad: 1 }],
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
        (sum, p) => sum + p.precio * p.cantidad,
        0
      );

      // Actualizar stock
      const productosActualizados = state.productos.map((prod) => {
        const comprado = state.carrito.find((c) => c.id === prod.id);
        if (comprado) {
          return { ...prod, stock: prod.stock - comprado.cantidad };
        }
        return prod;
      });

      return {
        ...state,
        ventas: state.ventas + totalCompra,
        carrito: [],
        productos: productosActualizados,
      };
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
