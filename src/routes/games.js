// Importing 'express' module.
import express from "express";
import axios from "axios";
// Importing models.
import { GameModel } from "../models/Games.js";

// Importing environmental variables
import { config } from "dotenv";


config({ path: "./config.env" });

const CLIENT_ID = process.env.CLIENT_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;



// Object: router.
const router = express.Router();

// Route handler: Home API (gets all games).
router.get("/", async (req, res) => {
  try {
    const response = await GameModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

//Route handler: get a single game.
router.get("/:id", async (req, res) => {
  try {
    const response = await GameModel.findById(req.params.id);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Route handler: Add a game to the list.
router.post("/", async (req, res) => {
  // Creating new game in model.
  const game = new GameModel(req.body);
  // Saving the game.
  try {
    const response = await game.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Route handler: Delete a game from the list.
router.delete("/:id", async (req, res) => {
  try {
    const response = await GameModel.findByIdAndDelete(req.params.id);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Route handler: Update a game in the list.
router.put("/:id", async (req, res) => {
  try {
    const response = await GameModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Route handler: fetches all games from IGDB database
router.post("/igdb/games", async (req, res) => {
  console.log(req.body.query)
  try {
    var options = {
      method: 'POST',
      url: 'https://api.igdb.com/v4/games/',
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      data: req.body.query
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Exporting router to index.js.
export { router as gamesRouter };
