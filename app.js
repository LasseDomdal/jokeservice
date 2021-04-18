// app.js
const express = require('express');
const app = express();
const config = require('./config');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/api/jokes', require('./routes/joke'));
app.use('/api/othersites', require('./routes/site'))
app.use('/api/otherjokes/:site', require('./routes/site'))



const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // test