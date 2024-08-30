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

// Fetches 'name', 'cover', and 'first_release_date' for searched games
router.post("/games_by_search", async (req, res) => {
  // const query = `fields name, cover; limit 500; search "${req.body.query}"; where cover != null & category = 0 & parent_game = null & version_parent = null;`; // Fetches only main games
  const query = `fields name, cover; limit 500; search "${req.body.query}"; where (category = 0 | category = 4) & version_parent = null;`; // Fetches only main and standalone games
  // const query = `fields name, cover, first_release_date; limit 500; search "${req.body.query}"; where cover != null;`; // Fetches games of all categories

  try {
    const options = {
      method: "POST",
      url: "https://api.igdb.com/v4/games/",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: query,
      timeout: 10000,
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Fetches 'name', 'cover', and 'first_release_date' for games based to their 'id'
router.post("/games_by_id", async (req, res) => {
  const games = req.body.query;
  const query = `fields name, cover, first_release_date, category; limit 500; where id = (${games
    .map((games) => games.id)
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

// Fetches 'name', 'cover', 'first_release_date', and 'category' for a game's related content (DLCs, expansions, editions, etc. except bundles) based on its 'id'
router.post("/related_content", async (req, res) => {
  const query = `fields name, cover, first_release_date, category; limit 500; where parent_game = ${req.body.query} | version_parent = ${req.body.query};`;

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

// Fetches all necessary initial data for game.js (individual game page) based on its 'id'
router.post("/game", async (req, res) => {
  const query = `fields websites, videos, version_parent, themes, summary, storyline, player_perspectives, platforms, parent_game, involved_companies, genres, game_modes, game_engines, screenshots, franchises, name, cover, rating, first_release_date, artworks, aggregated_rating, aggregated_rating_count, bundles, category, collections, standalone_expansions, external_games; where id = ${req.body.query};`;
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

// Fetches 'image_id' for the 'cover' of a list of games based on their 'id'
router.post("/covers", async (req, res) => {
  const validCoverIds = req.body.query
    .map((record) => record.cover?.id)
    .filter((id) => id !== undefined && id !== null);
  const query = `fields image_id; limit 500; where id = (${validCoverIds.join(
    ","
  )});`;

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

// Fetches 'image_id', 'height', and 'width' for the game's 'cover' based on its 'id'
router.post("/cover", async (req, res) => {
  const query = `fields image_id, height, width; where id = ${req.body.query};`;

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

// Fetches 'image_id', 'height', and 'width' for a list of 'artworks' based on their 'id'
router.post("/artworks", async (req, res) => {
  const query = `fields image_id, height, width; limit 500; where id = (${req.body.query
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

// Fetches 'image_id', 'height', and 'width' for a list of 'screenshots' based on their 'id'
router.post("/screenshots", async (req, res) => {
  const query = `fields image_id, height, width; limit 500; where id = (${req.body.query
    .map((artwork) => artwork.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/screenshots",
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

// Fetches 'name' for a list of 'collections' based on their 'id'
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

// Fetches 'name' for a list of 'genres' based on their 'id'
router.post("/genres", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((genre) => genre.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/genres",
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

// Fetches 'name' for a list of 'game_modes' based on their 'id'
router.post("/game_modes", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((mode) => mode.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/game_modes",
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

// Fetches 'name' for a list of 'franchises' based on their 'id'
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

// Fetches 'name' for a list of 'game_engines' based on their 'id'
router.post("/game_engines", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((engine) => engine.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/game_engines",
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

// Fetches 'category' and 'url' for a list of 'external_games' based on their 'id'
router.post("/external_games", async (req, res) => {
  const query = `fields category, url; limit 500; where id = (${req.body.query
    .map((service) => service.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/external_games",
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

// Fetches 'name' and 'first_release_date' for a game based on its 'id'
router.post("/name_and_date", async (req, res) => {
  const query = `fields name, first_release_date; where id = ${req.body.query};`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/games",
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

// Fetches descriptive info for an 'involved_companies' object based on its 'id'
router.post("/involved_companies", async (req, res) => {
  const query = `fields company, developer, porting, publisher, supporting; limit 500; where id = (${req.body.query
    .map((company) => company.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/involved_companies",
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

// Fetches 'name' for a 'companies' object based on its 'id'
router.post("/companies", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((company) => company.company)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/companies",
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

// Fetches 'name' and 'abbreviation' for a list of 'platforms' based on their 'id'
router.post("/platforms", async (req, res) => {
  const query = `fields name, abbreviation; limit 500; where id = (${req.body.query
    .map((platform) => platform.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/platforms",
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

// Fetches 'name' for a list of 'player_perspectives' based on their 'id'
router.post("/player_perspectives", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((perspective) => perspective.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/player_perspectives",
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

// Fetches 'name' for a list of 'themes' based on their 'id'
router.post("/themes", async (req, res) => {
  const query = `fields name; limit 500; where id = (${req.body.query
    .map((theme) => theme.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/themes",
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

// Fetches 'name' and 'video_id' for a list of 'game_videos' based on their 'id'
router.post("/game_videos", async (req, res) => {
  const query = `fields name, video_id; limit 500; where id = (${req.body.query
    .map((theme) => theme.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/game_videos",
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

// Fetches 'category', 'url', and 'trusted' for a list of 'websites' based on their 'id'
router.post("/websites", async (req, res) => {
  const query = `fields category, url, trusted; limit 500; where id = (${req.body.query
    .map((website) => website.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/websites",
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
