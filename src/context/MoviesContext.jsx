import { createContext, useContext, useEffect, useState } from "react";
import { searchMovies } from "../services/api";

const MoviesContext = createContext();

const RECENT_SEARCHES_KEY = "recent-searches";
const RECENT_MOVIES_KEY = "recent-movies";
const MAX_RECENT_ITEMS = 8;

const readStorageList = (key) => {
    const saved = localStorage.getItem(key);

    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch {
        return [];
    }
};

const writeStorageList = (key, items) => {
    localStorage.setItem(key, JSON.stringify(items));
};

const normalizeMovie = (movie) => ({
    id: movie.id,
    title: movie.title,
    image: movie.image,
    year: movie.year,
});

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState(() => readStorageList(RECENT_SEARCHES_KEY));
    const [recentMovies, setRecentMovies] = useState(() => readStorageList(RECENT_MOVIES_KEY));

    useEffect(() => {
        writeStorageList(RECENT_SEARCHES_KEY, recentSearches);
    }, [recentSearches]);

    useEffect(() => {
        writeStorageList(RECENT_MOVIES_KEY, recentMovies);
    }, [recentMovies]);

    const saveRecentSearch = (query) => {
        const normalizedQuery = query.trim();

        if (!normalizedQuery) return;

        setRecentSearches((current) => {
            const next = [normalizedQuery, ...current.filter((item) => item !== normalizedQuery)];

            return next.slice(0, MAX_RECENT_ITEMS);
        });
    };

    const saveRecentMovies = (nextMovies) => {
        setRecentMovies((current) => {
            const merged = [
                ...nextMovies.map(normalizeMovie),
                ...current,
            ].filter((movie, index, list) => list.findIndex((item) => item.id === movie.id) === index);

            return merged.slice(0, MAX_RECENT_ITEMS);
        });
    };

    const fetchMovies = async (query) => {
        try {
            setLoading(true);

            const data = await searchMovies(query);

            const transformed = data.map((movie) => ({
                id: movie.imdbID,
                title: movie.Title,
                image: movie.Poster !== "N/A" ? movie.Poster : "/no-image.png",
                year: movie.Year,
            }));

            saveRecentSearch(query);
            saveRecentMovies(transformed);
            setMovies(transformed);
        } catch (error) {
            console.error(error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MoviesContext.Provider value={{ movies, loading, fetchMovies, recentSearches, recentMovies, saveRecentMovies }}>
            {children}
        </MoviesContext.Provider>
    );
};


export const useMoviesContext = () => useContext(MoviesContext);