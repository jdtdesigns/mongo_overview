const express = require('express');
const path = require('path');

const db = require('./config/connection');
const api_routes = require('./routes/api_routes');

const app = express();
const PORT = 3333;

// Create a GET route for every file inside of client
app.use(express.static('../client'));

// Add the JSON middleware / Allow JSON to be attached to req.body
app.use(express.json());

// Load our routes
app.use('/api', api_routes);

// Send back the index.html file for all other requests/routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

db.once('open', () => {
  console.log('DB connection established');

  // Start express server
  app.listen(PORT, () => {
    console.log('Express server started on port', PORT);
  })
});
