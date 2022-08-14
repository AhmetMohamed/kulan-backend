const mongoose = require("mongoose");
const UserModel = require("./userModel");

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const CommentSchema = mongoose.model("Comment", commentSchema);
module.exports = CommentSchema;
