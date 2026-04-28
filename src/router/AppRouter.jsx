import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import MoviesList from "../pages/MoviesList";
import MovieDetail from "../pages/MovieDetail";
import NotFound from "../pages/NotFound";

import { MoviesProvider } from "../context/MoviesContext";
import { FavoritesProvider } from "../context/FavoritesContext";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <MoviesProvider>
        <FavoritesProvider>
          <App>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<MoviesList />} />
              <Route path="/items/:id" element={<MovieDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </App>
        </FavoritesProvider>
      </MoviesProvider>
    </BrowserRouter>
  );
};

export default AppRouter;