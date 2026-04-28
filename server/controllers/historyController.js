import { listSearches, listViewedMovies, saveSearch, saveViewedMovie } from "../services/historyService.js";

export const getSearches = (_, res) => {
  res.json(listSearches());
};

export const createSearch = (req, res) => {
  try {
    res.status(201).json(saveSearch(req.body.query));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getViewedMovies = (_, res) => {
  res.json(listViewedMovies());
};

export const createViewedMovie = (req, res) => {
  try {
    res.status(201).json(saveViewedMovie(req.body.movie));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};