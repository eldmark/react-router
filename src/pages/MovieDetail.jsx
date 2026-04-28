import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById, saveViewedMovie } from "../services/api";
import "../styles/detail.css";

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
        await saveViewedMovie({
          id: data.imdbID,
          title: data.Title,
          image: data.Poster !== "N/A" ? data.Poster : "/no-image.png",
          year: data.Year,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
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