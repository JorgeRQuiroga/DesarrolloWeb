import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ links }) {
  return (
    <header className="bg-dark text-white py-3 shadow">
      <div className="container text-center">
        <h1 className="fw-bold mb-2">Bienvenido al Kiosco</h1>
        <p className="mb-3">Explorá la lista de productos o agregá nuevos</p>

        <nav>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                "btn px-4 py-2 " +
                (isActive ? "btn-primary fw-bold" : "btn-outline-light")
              }
            >
              Home
            </NavLink>

            {/* Lista */}
            <NavLink
              to="/lista"
              className={({ isActive }) =>
                "btn px-4 py-2 " +
                (isActive ? "btn-primary fw-bold" : "btn-outline-light")
              }
            >
              Lista de productos
            </NavLink>

            {/* Agregar productos */}
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                "btn px-4 py-2 " +
                (isActive ? "btn-primary fw-bold" : "btn-outline-light")
              }
            >
              Agregar productos
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;