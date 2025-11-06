// src/components/Navbar.js
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import KioskoContext from "../context/KioskoContext";
import "./Navbar.css";

function Navbar() {
  const { state } = useContext(KioskoContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
        Kiosko de kiko
        </NavLink>

        <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/Productos" className="nav-link">
                Productos
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/ContadorVentas" className="nav-link">
                Nueva Venta
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/ventas" className="nav-link">
                Ventas
            </NavLink>
            </li>
        </ul>

        <div
            className="btn btn-outline-light"
            onClick={() => navigate("/carrito")}
            style={{ cursor: "pointer" }}
        >
            Carrito: {state.carrito.reduce((sum, p) => sum + (p.cantidad || 1), 0)} | Ventas: ${state.ventas}
        </div>
        </div>
    </div>
    </nav>
  );
}

export default Navbar;
