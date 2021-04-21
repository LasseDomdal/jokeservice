const controller = require("../controllers/controllers");
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/:site", async (request, response) => {
  try {
    const url = "farjokes.heroku.com/api/jokes";
    let sites = await get(url);
    response.send(sites);
  } catch (e) {
    sendStatus(e, response);
  }
});

function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}

async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.json();
}

module.exports = router;
