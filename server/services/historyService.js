import db from "../db/database.js";
import { normalizeMovie, parsePayloadRows } from "../utils/movie.js";

const searchUpsert = db.prepare(`
  INSERT INTO search_history (query, updated_at)
  VALUES (?, ?)
  ON CONFLICT(query) DO UPDATE SET updated_at = excluded.updated_at
`);

const searchList = db.prepare("SELECT query FROM search_history ORDER BY updated_at DESC");

const movieUpsert = db.prepare(`
  INSERT INTO movie_history (id, title, image, year, payload, updated_at)
  VALUES (@id, @title, @image, @year, @payload, @updatedAt)
  ON CONFLICT(id) DO UPDATE SET
    title = excluded.title,
    image = excluded.image,
    year = excluded.year,
    payload = excluded.payload,
    updated_at = excluded.updated_at
`);

const movieList = db.prepare("SELECT payload FROM movie_history ORDER BY updated_at DESC");

export const listSearches = () => searchList.all().map((row) => row.query);

export const saveSearch = (query) => {
  const normalizedQuery = String(query || "").trim();

  if (!normalizedQuery) {
    throw new Error("query is required");
  }

  searchUpsert.run(normalizedQuery, Date.now());
  return listSearches();
};

export const listViewedMovies = () => parsePayloadRows(movieList.all());

export const saveViewedMovie = (movie) => {
  const normalizedMovie = normalizeMovie(movie);

  if (!normalizedMovie) {
    throw new Error("movie is required");
  }

  movieUpsert.run(normalizedMovie);
  return listViewedMovies();
};