import { createContext, useContext, useEffect, useState } from "react";
import {
    getRecentMovies,
    getRecentSearches,
    saveViewedMovie,
    saveSearchQuery,
    searchMovies,
} from "../services/api";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const [searches, moviesData] = await Promise.all([
                    getRecentSearches(),
                    getRecentMovies(),
                ]);

                setRecentSearches(searches);
                setRecentMovies(moviesData);
            } catch (error) {
                console.error(error);
            }
        };

        loadHistory();
    }, []);

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

            await Promise.all([
                saveSearchQuery(query),
                transformed[0] ? saveViewedMovie(transformed[0]) : Promise.resolve(),
            ]);

            setRecentSearches((current) => [query.trim(), ...current.filter((item) => item !== query.trim())].slice(0, 8));
            if (transformed[0]) {
                setRecentMovies((current) => [transformed[0], ...current.filter((item) => item.id !== transformed[0].id)].slice(0, 8));
            }
            setMovies(transformed);
        } catch (error) {
            console.error(error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MoviesContext.Provider value={{ movies, loading, fetchMovies, recentSearches, recentMovies, setRecentMovies }}>
            {children}
        </MoviesContext.Provider>
    );
};


export const useMoviesContext = () => useContext(MoviesContext);