const { model, Schema } = require('mongoose');

const autobotSchema = new Schema({
  name: String,
  color: String
});

const Autobot = model('Autobot', autobotSchema);

module.exports = Autobot;