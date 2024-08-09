const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// Middleware CORS
app.use(cors({origin: true}));

// Exemple de fonction proxy
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("No URL provided.");
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Exporter l'application express en tant que fonction Firebase
exports.api = functions.https.onRequest(app);
