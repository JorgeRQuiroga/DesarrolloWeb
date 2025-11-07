import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import NuevaVenta from "./pages/NuevaVenta";
import "./App.css";
import NuevoProducto from "./pages/NuevoProducto";
import { KioskoProvider } from "./context/KioskoContext";
import Ventas from "./pages/Ventas";
import DetalleCarrito from "./pages/DetalleCarrito";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductoDetalle from "./pages/ProductoDetalle";
import EditarProducto from "./pages/EditarProducto";

function App() {
  return (
    <KioskoProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />  
            <Route path="/productos/:id/editar" element={<EditarProducto />} />          
            <Route path="/ContadorVentas" element={<NuevaVenta />} />
            <Route path="/Productos/NuevoProducto" element={<NuevoProducto />} />            
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/carrito" element={<DetalleCarrito />} />
          </Routes>
        </div>
      </Router>
    </KioskoProvider>
  );
}

export default App;
