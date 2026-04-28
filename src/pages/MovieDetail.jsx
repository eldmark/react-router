import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";
import "../styles/detail.css";
const RECENT_MOVIES_KEY = "recent-movies";

const readStorageList = (key) => {
  const saved = localStorage.getItem(key);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

const saveViewedMovie = (movie) => {
  const current = readStorageList(RECENT_MOVIES_KEY);
  const nextMovie = {
    id: movie.imdbID,
    title: movie.Title,
    image: movie.Poster !== "N/A" ? movie.Poster : "/no-image.png",
    year: movie.Year,
  };

  const next = [nextMovie, ...current.filter((item) => item.id !== nextMovie.id)].slice(0, 8);
  localStorage.setItem(RECENT_MOVIES_KEY, JSON.stringify(next));
};

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getMovieById(id);
      setMovie(data);
      saveViewedMovie(data);
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p className="loading">Cargando...</p>;

  return (
    <div className="detail">
      <img src={movie.Poster} alt={movie.Title} />

      <div className="info">
        <h1>{movie.Title}</h1>

        <p><strong>Año:</strong> {movie.Year}</p>
        <p><strong>Género:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actores:</strong> {movie.Actors}</p>

        <p className="plot">{movie.Plot}</p>

        <div className="ratings">
          {movie.Ratings.map((r, i) => (
            <p key={i}>
              <strong>{r.Source}:</strong> {r.Value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;