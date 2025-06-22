// routes/summary.js
import express from "express";
import { summarizeEpisode } from "../controllers/summary.js";

const router = express.Router();

router.post("/", summarizeEpisode);

export default router;
