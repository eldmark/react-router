import { createContext, useContext, useEffect, useState } from "react";
import { addFavorite, getFavorites, removeFavorite } from "../services/api";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error(error);
      } finally {
        setFavoritesLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = async (movie) => {
    const exists = favorites.find((f) => f.id === movie.id);

    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== movie.id));

      try {
        await removeFavorite(movie.id);
      } catch (error) {
        console.error(error);
      }
    } else {
      setFavorites([...favorites, movie]);

      try {
        await addFavorite(movie);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);