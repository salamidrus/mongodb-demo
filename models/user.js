const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    profiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
