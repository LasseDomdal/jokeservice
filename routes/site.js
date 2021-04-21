const controller = require("../controllers/controllers");
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const url = "https://krdo-joke-registry.herokuapp.com/api/services";
    let sites = await get(url);

    response.send(sites);
  } catch (e) {
    sendStatus(e, response);
  }
});
//Upload vores site til registry
router.post("/", async (request, response) => {
  try {
    const url = "https://krdo-joke-registry.herokuapp.com/api/services";
    let sites = await get(url);
    response.send({ sites, message: "Site saved!" });
  } catch (e) {
    sendStatus(e, response);
  }
});
// router.delete("/"),
//   async (request, response) => {
//     const url = "https://krdo-joke-registry.herokuapp.com/api/services";
//     let sites = await get(url);
//     response.send({ sites, message: "Site deleted!" });
//   };

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
