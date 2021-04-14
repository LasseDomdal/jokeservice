// index.js
// const router = require("../routes/joke");

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function getText(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.text();
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201) // Created
        throw new Error(respons.status);
    return await respons.json();
}


async function generateJokesList(jokes) {
    let template = await getText('/jokeservice.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({jokes});
}

async function main() {
    try {
        let jokes = await get('/api/jokes');
        document.body.innerHTML = await generateJokesList(jokes);
        document.getElementById("sendKnap").addEventListener("click", getJokeValues);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();


async function generateSitesList(sites) {
    let template = await getText('/otherSites.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({sites});
}

async function getOtherSites() {
    try {
        let otherSites = await get('https://krdo-joke-registry.herokuapp.com/api/services');
        document.body.innerHTML += await generateSitesList(otherSites);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
getOtherSites();

async function generateOtherJokesList(otherJokes) {
    let template = await getText('/otherJokes.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({otherJokes});
}

function chooseSite() {
    let otherSite = sitePicker.value;
    console.log(otherSite.adress);
}

async function getOtherJokes() {
    try {
        let otherJokes = await get('otherSite.adress' + "/api/jokes");
        document.body.innerHTML += await generateSitesList(otherJokes);
        document.getElementById("sitePicker").addEventListener("change", chooseRum);
        let sitePicker = document.querySelector("#sitePicker");
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}



async function getJokeValues () {
    joke = {
        setup: document.getElementById("setup").value,
        punchline: document.getElementById("punchline").value,
    };
    await post("/api/jokes", joke);
    clearFelter();
}

function clearFelter() {
    document.getElementById("setup").value = " ";
    document.getElementById("punchline").value = " ";
}