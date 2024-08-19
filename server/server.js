require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/connection');
const api_routes = require('./routes/api_routes');
const auth_routes = require('./routes/auth_routes');

const app = express();
const PORT = 3333;

// Create a GET route for every file inside of client
app.use(express.static('../client/deploy_code'));

// Attach all client-side cookies to the req.cookies property
app.use(cookieParser());

// Add the JSON middleware / Allow JSON to be attached to req.body
app.use(express.json());

// Load our routes
app.use('/api', api_routes);
app.use('/api/auth', auth_routes);

// Send back the index.html file for all other requests/routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/deploy_code/index.html'));
});

db.once('open', () => {
  console.log('DB connection established');

  // Start express server
  app.listen(PORT, () => {
    console.log('Express server started on port', PORT);
  })
});

