import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
  {
    episodeId: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Summary = mongoose.model("Summary", summarySchema);
export default Summary;
