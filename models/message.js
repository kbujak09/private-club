const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  date: { type: Date }
});

MessageSchema.virtual('date_formatted').get(function() {
  return this.date ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) : null;
});

module.exports = mongoose.model('Message', MessageSchema);