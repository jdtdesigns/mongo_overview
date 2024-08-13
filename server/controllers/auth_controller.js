const { User } = require('../models');

module.exports = {
  async registerUser(req, res) {
    console.log('register user', req.body);

    res.json({
      message: 'works!'
    })
  }
}