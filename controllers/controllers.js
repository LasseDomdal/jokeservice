// controllers.js
const mongoose = require("mongoose");
const Joke = require("../models/Joke");
const config = require("../config");

mongoose.connect(config.databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createJoke = function (setup, punchline) {
  return Joke.create({
    setup,
    punchline,
  });
};

exports.createJoke("Hvordan får man en fisk til at grine?", "Man putter den i kildevand");
exports.createJoke("Hvornår har bageren fødselsdag?", "Den 11/11");

// exports.getJoke = function (jokeId) {
//   return Joke.findById(jokeId).exec();
// };

exports.getJokes = function () {
  return Joke.find().exec();
};

