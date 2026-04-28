import { Router } from "express";
import { createFavorite, getFavorites, removeFavorite } from "../controllers/favoritesController.js";

const router = Router();

router.get("/", getFavorites);
router.post("/", createFavorite);
router.delete("/:id", removeFavorite);

export default router;