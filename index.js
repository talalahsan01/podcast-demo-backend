import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./app/config/db.js";
import cors from "cors";
import podcastRoutes from "./app/routes/podcast.js";
import summaryRoutes from "./app/routes/summary.js";

dotenv.config();
const app = express();
app.use(cors());
connectDB();

app.use(express.json());

// API Routes
app.use("/api/podcasts", podcastRoutes);
app.use("/api/summary", summaryRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
