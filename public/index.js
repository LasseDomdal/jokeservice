// index.js
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

async function generateJokesList(jokes) {
    let template = await getText('/jokes.hbs');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({jokes});
}

async function main() {
    try {
        let jokes = await get('/joke');
        document.body.innerHTML = await generateJokesList(jokes);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();