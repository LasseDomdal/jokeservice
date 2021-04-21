// index.js
let randomJoke;

// standard get - gettext - post
async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.json();
}

async function getText(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.text();
}

async function post(url, objekt) {
  const respons = await fetch(url, {
    method: "POST",
    body: JSON.stringify(objekt),
    headers: { "Content-Type": "application/json" },
  });
  if (respons.status !== 200)
    // Created
    throw new Error(respons.status);
  return await respons.json();
}

// generate list of other jokeservices
async function generateSitesList(sites) {
  let template = await getText("/otherSites.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ sites });
}

async function getOtherSites() {
  try {
    let otherSites = await get("/api/othersites");
    document.body.innerHTML += await generateSitesList(otherSites);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}

// geneerate list of other sites jokes
async function generateOtherJokesList(otherJokes) {
  let template = await getText("/otherJokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ otherJokes });
}

async function getOtherJokes() {
  try {
    let e = document.getElementById("sitePicker");
    let selectedValue = e.options[e.selectedIndex].value;
    let otherJokes;
    //Tjekker om sidste char i URL'en er en skråstreg
    if (selectedValue.slice(-1) !== "/") {
      otherJokes = await get(selectedValue + "/api/jokes");
    } else {
      otherJokes = await get(selectedValue + "api/jokes");
    }
    document.body.innerHTML += await generateOtherJokesList(otherJokes);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}

getOtherJokes();

// list of jokes from database and generate new jokes to database
async function getJokeValues() {
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

async function generateJokesList(randomJoke) {
  let template = await getText("/jokeservice.hbs");
  //   console.log(randomJoke);
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ randomJoke });
}

async function nyJoke() {
  let jokes = await get("/api/jokes");
  randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  document.body.innerHTML = await generateJokesList(randomJoke);
  getOtherSites();
}

async function main() {
  try {
    let jokes = await get("/api/jokes");
    randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    document.body.innerHTML += await generateJokesList(randomJoke);
    getOtherSites();
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}

main();

// oprette site på fælles database
async function PostSite() {
  let voresSite = {
    name: "Den rigtige Lasse og Williams sjove jokes",
    address: "https://jokerservice.herokuapp.com",
    secret: "jokerservice",
  };
  await post(
    "https://krdo-joke-registry.herokuapp.com/api/services",
    voresSite
  );
}
// PostSite();

// delete site
// async function deleteSite() {
//   let sletSite = {
//     address: "http://jokerservice.herokuapp.com",
//     secret: "jokerservice",
//   };
//   await deLete("/api/othersites", sletSite);
// }
// deleteSite();

// async function deLete(url) {
//   let respons = await fetch(url, {
//     method: "DELETE",
//   });
//   if (respons.status !== 200)
//     // OK
//     throw new Error(respons.status);
//   return await respons.json();
// }
