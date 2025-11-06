import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Productos.css"; // estilos propios

function FormularioProducto({ productos, onAgregar, onEditar }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const productoExistente = id
    ? productos.find((p) => p.id === Number(id))
    : null;

  const [nombre, setNombre] = useState(productoExistente ? productoExistente.nombre : "");
  const [precio, setPrecio] = useState(productoExistente ? productoExistente.precio : "");
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !precio || Number(precio) <= 0) {
      setMensaje({ tipo: "error", texto: "Complete todos los campos correctamente." });
      return;
    }

    if (productoExistente && onEditar) {
      onEditar({ id: productoExistente.id, nombre: nombre.trim(), precio: Number(precio) });
      setMensaje({ tipo: "success", texto: "Producto editado con éxito." });
    } else if (onAgregar) {
      onAgregar({ nombre: nombre.trim(), precio: Number(precio) });
      setMensaje({ tipo: "success", texto: "Producto agregado con éxito." });
    }

    setTimeout(() => {
      navigate("/lista");
    }, 1000);
  };

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <div className="container productos-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{productoExistente ? "Editar Producto" : "Agregar Producto"}</h2>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-secondary">
            ⬅️ Home
          </Link>
          <Link to="/lista" className="btn btn-outline-primary">
            📋 Lista
          </Link>
        </div>
      </div>

      {mensaje && (
        <div
          className={`alert ${
            mensaje.tipo === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3 shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Nombre del producto</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Gaseosa"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ej: 500"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            min="1"
            required
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {productoExistente ? "Guardar cambios" : "Agregar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setNombre("");
              setPrecio("");
              setMensaje(null);
            }}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioProducto;