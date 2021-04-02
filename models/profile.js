const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    age: {
      type: Number,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const profile = mongoose.model("Profile", profileSchema);

module.exports = profile;
