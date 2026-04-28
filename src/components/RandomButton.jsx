import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/searchBar.css";

const RandomButton = ({ movies }) => {
  const navigate = useNavigate();

  const handleRandom = () => {
    if (!movies.length) return;

    const randomMovie =
      movies[Math.floor(Math.random() * movies.length)];

    navigate(`/items/${randomMovie.id}`);
  };

  return <button className="secondary-btn" onClick={handleRandom}>Película aleatoria</button>;
};

RandomButton.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default RandomButton;