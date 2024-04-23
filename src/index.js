// Importing modules to file.
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Importing keys from 'config.env'.
import { config } from "dotenv";
config({ path: "./config.env" });

// Importing routers from '/routes'.
import { gamesRouter } from "./routes/games.js";

// Creating express app.
const app = express();

// Adding middlewares.
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Mounting routers to respective paths.
app.use("/games", gamesRouter);

// Creating 'uri' variable from 'config.env' key.
const uri = process.env.URI;

// Establish connection to database.
mongoose.connect(uri);

// Starting HTTP server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
