// Importing mongoose module to file.
import mongoose from "mongoose";

// Creating 'GameSchema' schema.
const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  franchise: {
    type: String,
  },
  developer: {
    type: String,
  },
  publisher: {
    type: String,
  },
  director: {
    type: String,
  },
  producer: {
    type: String,
  },
  designer: {
    type: String,
  },
  programmer: {
    type: String,
  },
  artist: {
    type: String,
  },
  writer: {
    type: String,
  },
  composer: {
    type: String,
  },
  engine: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: String,
    default: "Not played",
    required: true,
  },
  genres: {
    type: [String],
  },
  platforms: {
    type: [String],
  },
  modes: {
    type: [String],
  },
  rating: {
    type: Number,
  },
});

// Creating 'GameModel' for 'games' MongoDB collection, using 'GameSchema'.
export const GameModel = new mongoose.model("games", GameSchema);
