
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/movieCard.css";

const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFav = favorites.some((f) => f.id === movie.id);

  return (
    <div className="card">
      <img src={movie.image} alt={movie.title} />

      <div className="card-content">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>

        <button onClick={() => toggleFavorite(movie)}>
          {isFav ? "❤️" : "🤍"}
        </button>

        <Link to={`/items/${movie.id}`} className="btn">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};


export default MovieCard;