const posts = require("../Models/postModel");

exports.createPost = async (req, res) => {
  try {
    const post = await posts.findOne({ title: req.body.title });
    if (post) {
      return res.status(400).json({ message: "Question title already posted" });
    }
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
    const post = await posts.find({});
    // All found Post Questions
    res.status(200).json({ message: post.length, posts: post });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    //find all Question from the database
    const post = await posts.findById(req.params.id);
    res.status(200).json({ message: "Question found successfully", post });
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
exports.commentPost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await posts.findById(id);
    if (!post.comments.includes(userId)) {
      await post.updateOne({ $push: { comments: req.body.text }, userId });
      res.status(200).json({ message: "comment is commited successfully" });
    }
  } catch (error) {}
};
