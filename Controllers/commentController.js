const comments = require("../Models/commentModel");

exports.createComment = async (req, res) => {
  //find out which post you are commenting
  const comment = await comments.findOne({ text: req.body.text });
  if (comment) {
    return res.status(400).json({ message: "Comment already posted" });
  }
  await comments.create(req.body);
  res.status(200).json({ message: "Comment is posted successfully " });
};

exports.getAllComment = async (req, res) => {
  try {
    //find all Question from the database
    const comment = await comments.find({});
    // All found Question
    res.status(200).json({ message: comment.length, comments: comment });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getComment = async (req, res) => {
  try {
    //find all Question from the database
    const comment = await comments.findById(req.params.id);
    res.status(200).json({ message: "Comment found successfully", comment });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.editComment = async (req, res) => {
  try {
    //find all Question from the database
    const comment = await comments.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    //find all Question from the database
    const comment = await comments.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
