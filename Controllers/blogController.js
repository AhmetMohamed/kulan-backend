const blogs = require("../Models/blogModel");

exports.createBlog = async (req, res) => {
  try {
    const blog = await blogs.findOne({ blogTitle: req.body.blogTitle });
    // console.log(blog);
    if (blog) {
      return res.status(400).json({ message: "Blog is Already Created!" });
    }
    req.body.blogUser = req.user.id;
    req.body.blogbackground = req.file.filename;
    console.log(req.body);
    await blogs.create(req.body);
    res.status(200).json({ message: "Blog is created successfully!" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    const blog = await blogs.find({}).populate("blogUser");
    res.status(200).json({ messages: blog.length, data: blog });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await blogs.findById(req.params.id).populate("blogUser");
    res.status(200).json({ message: "get One blog", data: blog });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

exports.editBlog = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
};
