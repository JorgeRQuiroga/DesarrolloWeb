import React, { useContext } from "react";
import KioskoContext from "../context/KioskoContext";

function Ventas() {
  const { state } = useContext(KioskoContext);
    return (
    <div className="container mt-5">
        <div className="card shadow-lg text-center">
        <div className="card-header bg-success text-white">
            <h3 className="mb-0">Total de Ventas</h3>
        </div>
        <div className="card-body">
            <h1 className="display-4">${state.ventas}</h1>
            <p className="text-muted">Monto acumulado en caja</p>
        </div>
        </div>
    </div>
    );
}

export default Ventas;
