import { useEffect, useState } from "react";
import { getTodayMovies } from "../services/api";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTodayMovies();

        // 🔥 transformación clave
        const transformed = data.recommendations.map((movie, index) => ({
          id: encodeURIComponent(movie.media_url), // ID único
          title: movie.title,
          image: movie.image_url,
          score: movie.critics_score,
          mediaUrl: movie.media_url,
        }));

        setMovies(transformed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovies;