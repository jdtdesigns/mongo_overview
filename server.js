const express = require('express');
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const app = express();
const PORT = 3333;

const dbName = 'transformers_db';

// Add the JSON middleware / Allow JSON to be attached to req.body
app.use(express.json());

async function start() {
  await client.connect();
  console.log('Connected to MongoDB!');

  const db = client.db(dbName);
  const abCollection = db.collection('autobots');

  // GET Route to retrieve all autobots
  app.get('/api/autobots', async (req, res) => {
    const autobots = await abCollection.find({}).toArray();

    res.json(autobots);
  });

  // POST Route to create/add an autobot
  app.post('/api/autobots', async (req, res) => {
    // Create the autobot
    const info = await abCollection.insertOne({
      name: req.body.name,
      color: req.body.color
    });

    res.json({
      message: 'Autobot created successfully!'
    });
  });

  // Start express server
  app.listen(PORT, () => {
    console.log('Express server started on port', PORT);
  })
}

start();