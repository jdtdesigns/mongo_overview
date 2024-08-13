const { User } = require('../models');
const { sign, verify } = require('jsonwebtoken');

async function createToken(user_id) {
  // Generates a JSON Web Token - a JSON encrypted string that stores an object of data
  const token = await sign({ user_id: user_id }, process.env.JWT_SECRET);

  return token;
}

module.exports = {
  async registerUser(req, res) {
    try {
      const user = await User.create(req.body);

      // Create a token for the user
      const token = await createToken(user._id);

      res.cookie('token', token, {
        // Keeps the cookie from being accessed by browser JS
        httpOnly: true,
        // Expiration in milliseconds - 5 minutes
        // maxAge: 5 * 60 * 1000
      });

      res.json({
        user: user
      });
    } catch (error) {
      console.log('register error', error);

      if (error.code === 11000) {
        res.status(403).json({
          message: 'That email address is already in use'
        })
      }
    }
  },

  async loginUser(req, res) {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {
      return res.status(403).json({
        message: 'A user with that email address could not be found'
      })
    }

    const valid_pass = await user.validatePassword(req.body.password);

    if (!valid_pass) {
      return res.status(401).json({
        message: 'Your password is incorrect'
      });
    }

    const token = await createToken(user._id);

    res.cookie('token', token, {
      // Keeps the cookie from being accessed by browser JS
      httpOnly: true,
      // Expiration in milliseconds - 5 minutes
      // maxAge: 5 * 60 * 1000
    });

    res.json({
      user: user
    });
  }
}