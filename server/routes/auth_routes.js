const router = require('express').Router();
const auth_controller = require('../controllers/auth_controller');

// Register User
router.post('/register', auth_controller.registerUser);

// Log In User
router.post('/login', auth_controller.loginUser);

module.exports = router;