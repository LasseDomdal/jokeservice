const mongoose = require("mongoose");

const Joke = new mongoose.Schema({
  setup: String,
  punchline: String,
});

module.exports = mongoose.model('Joke', Joke);
