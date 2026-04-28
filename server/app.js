import express from "express";
import cors from "cors";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/history", historyRoutes);

export default app;