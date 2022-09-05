const posts = require("../Models/postModel");
const jwt = require("jsonwebtoken");
const { logIn } = require("./userController");

exports.createPost = async (req, res) => {
  try {
    const post = await posts.findOne({ title: req.body.title });
    if (post) {
      return res.status(400).json({ message: "Question title already posted" });
    }

    req.body.postUser = req.user.id;
    // console.log(req.body);
    await posts.create(req.body);
    return res.status(200).json({ message: "Question created successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    //find all Question from the database
    const post = await posts.find({}).populate("postUser");
    // All found Post Questions
    res.status(200).json({ message: post.length, data: post });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    //find all Question from the database
    const post = await posts
      .findOne({ postUser: req.user.id })
      .populate("postUser");
    res
      .status(200)
      .json({ message: "Question found successfully", data: post });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.editPost = async (req, res) => {
  try {
    //find all Question from the database
    const post = await posts.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Question updated successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    //find all Question from the database
    const post = await posts.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

//Comment Post
exports.comments = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    await posts.findByIdAndUpdate(req.params.id, {
      $push: { comments: { comment: req.body.comment, user: req.user.id } },
    });
    res.status(200).json({ message: "comment is commited successfully" });
  } catch (e) {
    res.status(400).json({ message: "Error: " + e.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    //find all posted comment from the database
    const comment = await posts
      .findById(req.params.id)
      .populate("comments.user");
    res
      .status(200)
      .json({ message: "Question found successfully", data: comment });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
