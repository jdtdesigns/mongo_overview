const router = require('express').Router();
const { verify } = require('jsonwebtoken');

const autobot_controller = require('../controllers/autobot_controller');

async function blockGuestAndAttachToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'You are not authorized to perform that action'
    })
  }

  try {
    const data = await verify(token, process.env.JWT_SECRET);

    req.user_id = data.user_id;

    next();
  } catch (error) {
    console.log('JWT Error', error);

    res.status(402).json({
      message: 'Your token is invalid'
    });
  }
}

// GET Route to retrieve all autobots
router.get('/autobots', autobot_controller.getAllAutobots);

// POST Route to create/add an autobot
router.post('/autobots', blockGuestAndAttachToken, autobot_controller.createAutobot);

module.exports = router;