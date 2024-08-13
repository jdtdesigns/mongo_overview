const router = require('express').Router();

const autobot_controller = require('../controllers/autobot_controller');

// GET Route to retrieve all autobots
router.get('/autobots', autobot_controller.getAllAutobots);

// POST Route to create/add an autobot
router.post('/autobots', autobot_controller.createAutobot);

module.exports = router;