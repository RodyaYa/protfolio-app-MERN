const { Schema, model } = require("mongoose");

const schema = new Schema({
  login: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isOnline: { type: Boolean, default: false },
});

module.exports = model("User", schema);
