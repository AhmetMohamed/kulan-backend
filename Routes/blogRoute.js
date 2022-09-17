const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController");
const userController = require("../Controllers/userController");
const upload = require("../utils/Multer");

router
  .route("/")
  .post(
    userController.protect,
    upload.single("blogbackground"),
    blogController.createBlog
  )
  .get(blogController.getAllBlog);

router
  .route("/:id")
  .put(blogController.editBlog)
  .get(userController.protect, blogController.getBlog)
  .delete(userController.protect, blogController.deleteBlog);

module.exports = router;
