import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Movie Blog</Link>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/items">Películas</Link>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;