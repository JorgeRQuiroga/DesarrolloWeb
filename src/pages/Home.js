import React from "react";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();
    
    return (
    <div className="container mt-5">
        <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
            <h2 className="mb-0">Página de Inicio</h2>
        </div>
        <div className="card-body text-center">
            <h4 className="card-title">Bienvenido al Kioskito</h4>
            <p className="card-text text-muted">
            Aquí encontrarás todos los productos disponibles y podrás gestionar tus ventas fácilmente.
            </p>
            <button onClick={() => navigate("/ContadorVentas")} className="btn btn-success mt-3">
            Comenzar Nueva Venta
            </button>
        </div>
        </div>
    </div>
    )  
};

export default Home;
