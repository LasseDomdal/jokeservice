const mongoose = require("mongoose");

const Site = new mongoose.Schema({
    adress: String,
    name: String,
});

module.exports = mongoose.model('Site', Site);
