const router = require('express').Router();
const auth_controller = require('../controllers/auth_controller');

// Register User
router.post('/register', auth_controller.registerUser);

module.exports = router;