const BASE_URL = "https://www.omdbapi.com/";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  return response.json();
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data.Search;
};

export const getMovieById = async (id) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};

export const getFavorites = async () => apiRequest("/api/favorites");

export const addFavorite = async (movie) => apiRequest("/api/favorites", {
  method: "POST",
  body: JSON.stringify({ movie }),
});

export const removeFavorite = async (id) => apiRequest(`/api/favorites/${id}`, {
  method: "DELETE",
});

export const getRecentSearches = async () => apiRequest("/api/history/searches");

export const saveSearchQuery = async (query) => apiRequest("/api/history/searches", {
  method: "POST",
  body: JSON.stringify({ query }),
});

export const getRecentMovies = async () => apiRequest("/api/history/movies");

export const saveViewedMovie = async (movie) => apiRequest("/api/history/movies", {
  method: "POST",
  body: JSON.stringify({ movie }),
});