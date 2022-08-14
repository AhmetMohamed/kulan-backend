const express = require("express");
const router = express.Router();
const commentControllers = require("../Controllers/commentController");

router
  .route("/")
  .get(commentControllers.getAllComment)
  .post(commentControllers.createComment);

router
  .route("/:id")
  .get(commentControllers.getComment)
  .put(commentControllers.editComment)
  .delete(commentControllers.deleteComment);

module.exports = router;
