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

// Route handler: fetches a number of games' name and cover id according to search input
router.post("/games_by_search", async (req, res) => {
  // const query = `fields name, cover; limit 500; search "${req.body.query}"; where cover != null & category = 0 & parent_game = null & version_parent = null;`;
  const query = `fields name, cover; limit 500; search "${req.body.query}"; where cover != null;`; // TODO: Use above query for displaying only main titles

  try {
    const options = {
      method: "POST",
      url: "https://api.igdb.com/v4/games/",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Route handler: fetches a number of games' name and cover id according to IDs
router.post("/games_by_id", async (req, res) => {
  // const query = `fields name, cover; limit 500; search "${req.body.query}"; where cover != null & category = 0 & parent_game = null & version_parent = null;`;
  // const query = `fields name, cover; limit 500; search "${req.body.query}"; where cover != null;`; // TODO: Use above query for displaying only main titles
  const dlcs = req.body.query;
  const query = `fields name, cover; limit 500; where id = (${dlcs
    .map((dlc) => dlc.id)
    .join(",")});`;

  try {
    const options = {
      method: "POST",
      url: "https://api.igdb.com/v4/games/",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Route handler: fetches a game initial data from IGDB database
router.post("/game", async (req, res) => {
  const query = `fields franchises, name, cover, rating, first_release_date, artworks, aggregated_rating, aggregated_rating_count, bundles, category, collections, dlcs, expansions, standalone_expansions, external_games; where id = ${req.body.query};`;
  try {
    const options = {
      method: "POST",
      url: "https://api.igdb.com/v4/games/",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches a number of cover image_id URLs from IGDB database
router.post("/covers", async (req, res) => {
  const query = `fields image_id; limit 500; where id = (${req.body.query
    .map((record) => record.cover.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/covers",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches the cover's image_id URL from IGDB database
router.post("/cover", async (req, res) => {
  const query = `fields image_id; where id = ${req.body.query};`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/covers",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches the game artworks' image_ids URL from IGDB database
router.post("/artworks", async (req, res) => {
  const query = `fields image_id; limit 500; where id = (${req.body.query
    .map((artwork) => artwork.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/artworks",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches the game collections' names from IGDB database
router.post("/collections", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((collection) => collection.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/collections",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Rounte handler: fetches the game franchises' names from IGDB database
router.post("/franchises", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((franchise) => franchise.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/franchises",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
    };
    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Exporting router to index.js.
export { router as igdbRouter };
