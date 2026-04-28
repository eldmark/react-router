import { Router } from "express";
import { createSearch, createViewedMovie, getSearches, getViewedMovies } from "../controllers/historyController.js";

const router = Router();

router.get("/searches", getSearches);
router.post("/searches", createSearch);
router.get("/movies", getViewedMovies);
router.post("/movies", createViewedMovie);

export default router;