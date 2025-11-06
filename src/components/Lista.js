import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Lista.css"; // estilos propios

function Lista({ productos, onEliminar }) {
  useEffect(() => {
    document.title = `Productos (${productos.length})`;
  }, [productos]);

  return (
    <div className="container lista-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Productos</h2>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-secondary">
            ⬅️ Home
          </Link>
          <Link to="/productos" className="btn btn-success">
            ➕ Agregar
          </Link>
        </div>
      </div>

      {productos.length === 0 ? (
        <div className="alert alert-warning text-center">
          No hay productos cargados. ¡Agregá el primero!
        </div>
      ) : (
        <>
          <p className="text-muted">
            Mostrando {productos.length}{" "}
            {productos.length === 1 ? "producto" : "productos"}
          </p>

          <table className="table table-striped table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString("es-AR")}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm(`¿Eliminar "${item.nombre}"?`)) {
                          onEliminar(item.id);
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Lista;