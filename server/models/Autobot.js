const { model, Schema } = require('mongoose');

const autobotSchema = new Schema({
  name: String,
  color: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Autobot = model('Autobot', autobotSchema);

module.exports = Autobot;