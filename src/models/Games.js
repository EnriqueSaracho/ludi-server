// Importing mongoose module to file.
import mongoose from "mongoose";

// Creating 'GameSchema' schema.
const GameSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Not played",
    required: true,
  },
  rating: {
    type: Number,
  },
});

// Creating 'GameModel' for 'games' MongoDB collection, using 'GameSchema'.
export const GameModel = new mongoose.model("games", GameSchema);
