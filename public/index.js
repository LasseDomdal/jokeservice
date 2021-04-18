// index.js
// const router = require("../routes/joke");

// standard get - gettext - post
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


// generate list of other jokeservices
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


// geneerate list of other sites jokes
async function generateOtherJokesList(otherJokes) {
    let template = await getText('/otherJokes.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({otherJokes});
}

function chooseSite() {
    let sitePicker = document.getElementById("sitePicker").value;


}

async function getOtherJokes() {
    try {
        // let e =  document.getElementById("sitePicker").addEventListener("change", function() {
        //     e.options[e.selectedIndex].value
        // });
        // console.log(e);
        // let otherSite = e.value;
        let e =  document.getElementById("sitePicker");
        let selectedValue = e.options[e.selectedIndex].value;
        let otherJokes = await get( selectedValue +"/api/jokes");
        // let otherJokes = await get(  "http://farjokes.herokuapp.com/api/jokes");
        document.body.innerHTML += await generateOtherJokesList(otherJokes);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
getOtherJokes();


// list of jokes from database and generate new jokes to database
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