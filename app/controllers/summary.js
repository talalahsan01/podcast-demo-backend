import { OpenAI } from "openai";
import Summary from "../models/summary.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeEpisode = async (req, res) => {
  const { id, title, description } = req.body;

  try {
    const summaryExists = await Summary.findOne({ episodeId: id });

    if (summaryExists) {
      return res.json(summaryExists);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "user",
          content: `Summarize this podcast:
          Title: ${title}
          Description: ${description}`,
        },
      ],
    });

    const summary = completion.choices[0].message.content;
    const newSummary = await Summary.create({
      episodeId: id,
      summary,
    });

    res.json(newSummary);
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
