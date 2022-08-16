const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      type: String,
      ref: "Comment",
    },
  ],

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const PostSchema = mongoose.model("Post", postSchema);
module.exports = PostSchema;
