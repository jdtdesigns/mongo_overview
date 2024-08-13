const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    // Make sure to drop the user collection if it already exists to make the unique functionality work
    unique: true,
    validate: {
      validator(val) {
        // Validates that the string the user typed is a valid email string
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      }
    }
  },

  password: {
    type: String,
    required: true,
    minLength: [6, 'Your password must be at least 6 characters in length']
  },

  autobots: [{
    type: Schema.Types.ObjectId,
    ref: 'Autobot'
  }]
}, {
  // Edit the user's object before it gets sent out in a JSON response to the browser/client
  toJSON: {
    transform(user) {
      delete user.password;

      return user;
    }
  }
});

userSchema.pre('save', async function () {
  // Check if this is a newly created user and not just a user update
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.methods.validatePassword = async function (formPassword) {
  const is_valid = await compare(this.password, formPassword);

  return is_valid;
}

const User = model('User', userSchema);

module.exports = User;