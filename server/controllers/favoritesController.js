import { deleteFavorite, listFavorites, saveFavorite } from "../services/favoritesService.js";

export const getFavorites = (_, res) => {
  res.json(listFavorites());
};

export const createFavorite = (req, res) => {
  try {
    const favorites = saveFavorite(req.body.movie);
    res.status(201).json(favorites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFavorite = (req, res) => {
  deleteFavorite(req.params.id);
  res.status(204).end();
};