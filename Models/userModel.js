const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    required: true,
  },
  language: [
    {
      type: String,
      // required: true,
      // enum: [],
    },
  ],
  description: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  dribble: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
