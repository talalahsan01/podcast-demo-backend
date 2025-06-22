// routes/podcastRoutes.js
import express from "express";
import { fetchMockPodcasts } from "../controllers/podcast.js";

const router = express.Router();

router.get("/fetch", fetchMockPodcasts);
export default router;
