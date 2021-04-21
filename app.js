// app.js
const express = require("express");
const app = express();
const config = require("./config");
const cors = require("cors");

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/api/jokes", require("./routes/joke"));
app.use("/api/othersites", require("./routes/site"));
app.use("/api/otherjokes", require("./routes/otherjokes"));

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log("Listening on port " + port + " ...");

module.exports = app; // test
