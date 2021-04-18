const controller = require("../controllers/controllers");
const express = require('express');
const router = express.Router();

router
    .get('/', async (request, response) => {
        try {
            let sites = await controller.getSites();
            response.send(sites);
        } catch (e) {
            sendStatus(e, response);
        }
    })

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;