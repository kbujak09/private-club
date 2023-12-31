const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 24 },
  password: { type: String, required: true },
  membership: { type: Boolean, required: true, default: false },
  admin: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('User', UserSchema);