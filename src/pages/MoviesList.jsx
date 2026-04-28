import { useMoviesContext } from "../context/MoviesContext";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import RandomButton from "../components/RandomButton";
import "../styles/list.css";

const MoviesList = () => {
  const { movies, loading, fetchMovies } = useMoviesContext();

  return (
    <div className="movies-page container">
      <div className="toolbar">
        <div>
          <h1 className="movies-title">Buscar películas</h1>
          <p className="movies-subtitle">Guarda tus búsquedas recientes y vuelve a ellas desde la portada.</p>
        </div>

        <RandomButton movies={movies} />
      </div>

      <SearchBar onSearch={fetchMovies} />

      {loading && <p>Cargando...</p>}

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;