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
  const query = `fields name, cover, first_release_date; limit 500; search "${req.body.query}"; where cover != null;`; // TODO: Use above query for displaying only main titles

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

// Route handler: fetches a number of games' name and cover id according to IDs
router.post("/games_by_id", async (req, res) => {
  const dlcs = req.body.query;
  const query = `fields name, cover, first_release_date; limit 500; where id = (${dlcs
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
  const query = `fields websites, videos, version_parent, themes, summary, storyline, remasters, remakes, forks, ports, player_perspectives, platforms, parent_game, multiplayer_modes, involved_companies, genres, game_modes, game_engines, screenshots, franchises, name, cover, rating, first_release_date, artworks, aggregated_rating, aggregated_rating_count, bundles, category, collections, dlcs, expansions, standalone_expansions, external_games; where id = ${req.body.query};`;
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

// Rounte handler: fetches the game artworks' image_ids URL from IGDB database
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

// Rounte handler: fetches the game genres' names from IGDB database
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

// Rounte handler: fetches the game game_modes' names from IGDB database
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

// Rounte handler: fetches the game's info on other services (external_games)
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

// Rounte handler: fetches the game's engines
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

// Route handler: fetches multiplayer modes info
router.post("/multiplayer_modes", async (req, res) => {
  const query = `fields campaigncoop, dropin, lancoop, offlinecoop, offlinecoopmax, offlinemax, onlinecoop, onlinecoopmax, onlinemax, splitscreen, splitscreenonline; limit 500; where id = (${req.body.query
    .map((mode) => mode.id)
    .join(",")});`;

  try {
    var options = {
      method: "POST",
      url: "https://api.igdb.com/v4/multiplayer_modes",
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

// Rounte handler: fetches the games 'name'
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

// Rounte handler: fetches the game's involved companies' info
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

// Rounte handler: fetches the game's involved companies' name
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

// Rounte handler: fetches the game's platforms.name and .abbreviation,
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

// Rounte handler: fetches the game's player_perspectives.name
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

// Rounte handler: fetches the game's themes.name
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

// Rounte handler: fetches the game's game_videos.name and .video_id
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

// Rounte handler: fetches the game's info from other websites
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
