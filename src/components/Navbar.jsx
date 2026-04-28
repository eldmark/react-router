import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Movie Blog</Link>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/items">Películas</Link>
      </div>
    </nav>
  );
};

export default Navbar;