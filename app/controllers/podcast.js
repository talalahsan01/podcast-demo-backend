// controllers/podcastController.js
import { Client } from "podcast-api";

const client = Client({ apiKey: process.env.LISTEN_NOTES_API_KEY });

export const fetchMockPodcasts = async (req, res) => {
  try {
    const response = await client.search({
      q: "star wars",
      sort_by_date: 0,
      type: "podcast",
      offset: 0,
      len_min: 10,
      len_max: 30,
      episode_count_min: 20,
      genre_ids: "68,82",
      published_before: 1580172454000,
      published_after: 0,
      only_in: "title,description",
      language: "English",
      safe_mode: 0,
      unique_podcasts: 0,
      interviews_only: 0,
      sponsored_only: 0,
      page_size: 10,
    });

    const filteredData = response.data.results.map((item) => ({
      id: item.id,
      title: item.title_original,
      description: item.description_original?.replace(/<[^>]+>/g, "") || "",
      publisher: item.podcast?.publisher_original || "Unknown Publisher",
      thumbnail: item.thumbnail || item.image || "",
      duration: item.audio_length_sec
        ? `${Math.floor(item.audio_length_sec / 60)} min`
        : undefined,
      publishedAt: new Date(
        item.pub_date_ms ? item.pub_date_ms : item.earliest_pub_date_ms
      ).toISOString(),
    }));

    res.status(200).json(filteredData);
  } catch (err) {
    console.error("Mock fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch mock podcast episodes" });
  }
};

// (Keep this if you need database access elsewhere)
// export const getAllPodcasts = async (req, res) => {
//   try {
//     const podcasts = await Podcast.find().sort({ pubDateMs: -1 });
//     res.json(podcasts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
