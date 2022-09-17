const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: "Please enter a blog title",
      trim: true,
      unique: true,
    },
    blogbackground: {
      type: String,
      required: "Please enter a blog background image",
    },
    blogTag: {
      type: String,
      required: "Please enter a blog tag",
      trim: true,
    },
    blogBody: {
      type: String,
      required: "Please enter a blog body",
      trim: true,
    },
    blogType: {
      type: String,
      enum: ["Article", "Tutorial"],
      default: "Article",
      required: "Please enter a Article or Tutorial ",
      trim: true,
    },
    blogUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
