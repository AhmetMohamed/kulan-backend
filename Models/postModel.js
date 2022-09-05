const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: "Please enter question title",
    trim: true,
  },
  question: {
    type: String,
    required: "Please enter your question description here",
    trim: true,
  },
  // comments: [
  //   {
  //     type: String,
  //   },
  // ],
  comments: [
    {
      comment: String,
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],

  postUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const PostSchema = mongoose.model("Post", postSchema);
module.exports = PostSchema;
