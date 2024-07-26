// Importing 'express' module.
import express from "express";
import axios from "axios";

// Importing environmental variables
import { config } from "dotenv";
config({ path: "./config.env" });
const CLIENT_ID = process.env.CLIENT_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Object: router.
const router = express.Router();

// Route handler: fetches a game's name and cover id from IGDB database
router.post("/games", async (req, res) => {
  // console.log(req.body.query);
  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/games/",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: req.body.query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches the cover's url from IGDB database
router.post("/covers", async (req, res) => {
  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/covers",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: req.body.query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches the cover's url from IGDB database
router.post("/release_dates", async (req, res) => {
  //fields date, date; where id
  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/release_dates",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: req.body.query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches the cover's url from IGDB database
router.post("/artworks", async (req, res) => {
  //fields date, date; where id
  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/artworks",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: req.body.query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Exporting router to index.js.
export { router as igdbRouter };
