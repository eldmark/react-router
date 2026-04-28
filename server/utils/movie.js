export const normalizeMovie = (movie) => {
  if (!movie || !movie.id) {
    return null;
  }

  const id = String(movie.id);
  const title = movie.title || movie.Title || "Sin título";
  const image = movie.image || movie.Poster || "/no-image.png";
  const year = movie.year || movie.Year || "";

  return {
    id,
    title,
    image,
    year,
    payload: JSON.stringify({
      ...movie,
      id,
      title,
      image,
      year,
    }),
    updatedAt: Date.now(),
  };
};

export const parsePayloadRows = (rows) => rows.map((row) => JSON.parse(row.payload));