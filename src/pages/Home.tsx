import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/home.css";

type RecentMovie = {
  id: string;
  title: string;
  image: string;
  year: string;
};

const RECENT_SEARCHES_KEY = "recent-searches";
const RECENT_MOVIES_KEY = "recent-movies";

const readStorageList = <T,>(key: string): T[] => {
  const saved = localStorage.getItem(key);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

const Home = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentMovies, setRecentMovies] = useState<RecentMovie[]>([]);

  useEffect(() => {
    setRecentSearches(readStorageList<string>(RECENT_SEARCHES_KEY));
    setRecentMovies(readStorageList<RecentMovie>(RECENT_MOVIES_KEY));
  }, []);

  return (
    <div className="home container">
      <section className="hero">
        <p className="eyebrow">Movie Blog</p>
        <h1>Descubre películas, guarda tus búsquedas y vuelve a ver lo último que miraste.</h1>
        <p className="hero-copy">
          Navega por recomendaciones, busca por título y revisa tu actividad reciente desde la portada.
        </p>
        <Link to="/items" className="primary-btn">Buscar películas</Link>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>Últimas búsquedas</h2>
          <span>{recentSearches.length} guardadas</span>
        </div>

        <div className="search-tags">
          {recentSearches.length ? recentSearches.map((query) => (
            <span key={query} className="search-tag">{query}</span>
          )) : <p className="empty-state">Todavía no hay búsquedas recientes.</p>}
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>Películas recientes</h2>
          <span>{recentMovies.length} guardadas</span>
        </div>

        <div className="recent-grid">
          {recentMovies.length ? recentMovies.map((movie) => (
            <Link key={movie.id} to={`/items/${movie.id}`} className="recent-card">
              <img src={movie.image} alt={movie.title} />
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
              </div>
            </Link>
          )) : <p className="empty-state">Aún no hay películas recientes.</p>}
        </div>
      </section>
    </div>
  );
};

export default Home;