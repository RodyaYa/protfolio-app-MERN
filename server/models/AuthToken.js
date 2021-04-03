const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    access_token: { type: String },
    refresh_token: { type: String },
    email: { type: String },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

schema.virtual("client", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

schema
  .pre("find", function () {
    this.populate("client");
  })
  .pre("findOne", function () {
    this.populate("client");
  });

module.exports = model("Auth_Token", schema);
