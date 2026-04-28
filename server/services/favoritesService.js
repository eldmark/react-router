import db from "../db/database.js";
import { normalizeMovie, parsePayloadRows } from "../utils/movie.js";

const favoriteUpsert = db.prepare(`
  INSERT INTO favorites (id, title, image, year, payload, updated_at)
  VALUES (@id, @title, @image, @year, @payload, @updatedAt)
  ON CONFLICT(id) DO UPDATE SET
    title = excluded.title,
    image = excluded.image,
    year = excluded.year,
    payload = excluded.payload,
    updated_at = excluded.updated_at
`);

const favoriteDelete = db.prepare("DELETE FROM favorites WHERE id = ?");
const favoriteList = db.prepare("SELECT payload FROM favorites ORDER BY updated_at DESC");

export const listFavorites = () => parsePayloadRows(favoriteList.all());

export const saveFavorite = (movie) => {
  const normalizedMovie = normalizeMovie(movie);

  if (!normalizedMovie) {
    throw new Error("movie is required");
  }

  favoriteUpsert.run(normalizedMovie);
  return listFavorites();
};

export const deleteFavorite = (id) => {
  favoriteDelete.run(id);
};