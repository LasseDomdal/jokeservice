const controller = require("../controllers/controllers");
const express = require('express');
const router = express.Router();
const othersites = 'https://krdo-joke-registry.herokuapp.com';

router
    .get('/', async (request, response) => {
     try {
         const url = 'https://krdo-joke-registry.herokuapp.com/api/services';


             let sites = await controller.getSites();


         response.send(sites);
     } catch (e) {
         sendStatus(e, response);
     }
    })
    // .post('/', async (request, response) => {
    //         try {
    //             let {adress, name} = request.body;
    //             await controller.createSite(adress, name);
    //             response.send({message: 'Site saved!'});
    //         } catch (e) {
    //             sendStatus(e, response);
    //         }
    //     }
    // );
 //https://krdo-joke-registry.herokuapp.com/api/services

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;