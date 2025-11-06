import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Lista from "./components/Lista";
import Productos from "./components/Productos";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Gaseosa", precio: 500 },
    { id: 2, nombre: "Chocolate", precio: 300 },
  ]);

  const agregarProducto = (nuevo) => {
    setProductos([...productos, { id: Date.now(), ...nuevo }]);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <Router>
      <Routes>
        {/* Home con Navbar de bienvenida */}
        <Route
          path="/"
          element={
            <Navbar
              links={[
                { to: "/lista", label: "Lista de productos" },
                { to: "/productos", label: "Agregar productos" },
              ]}
            />
          }
        />

        {/* Pantallas independientes */}
        <Route
          path="/lista"
          element={<Lista productos={productos} onEliminar={eliminarProducto} />}
        />
        <Route
          path="/productos"
          element={<Productos onAgregar={agregarProducto} />}
        />
      </Routes>
    </Router>
  );
}

export default App;