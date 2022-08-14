const express = require("express");
const postControllers = require("../Controllers/postController");
const router = express.Router();

router
  .route("/")
  .get(postControllers.getAllPost)
  .post(postControllers.createPost);

router
  .route("/:id")
  .get(postControllers.getPost)
  .put(postControllers.editPost)
  .delete(postControllers.deletePost);

module.exports = router;
