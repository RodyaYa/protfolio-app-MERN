const { Schema, Types, model } = require("mongoose");

const schema = new Schema({
  previewImage: { type: String },
  body: { type: String },
  creator: { type: Types.ObjectId, ref: "User" },
  tags: { type: Array },
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

module.exports = model("MemoryDraft", schema);
