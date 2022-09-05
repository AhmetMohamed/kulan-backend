const express = require("express");
const postControllers = require("../Controllers/postController");
const userController = require("../Controllers/userController");
const router = express.Router();

router.route("/getAllPost").get(postControllers.getAllPost);
router
  .route("/createPost")
  .post(userController.protect, postControllers.createPost);

router.route;
router
  .route("/:id")
  .put(postControllers.editPost)
  .get(userController.protect, postControllers.getPost)
  .delete(postControllers.deletePost);

router
  .route("/comments/:id")
  .post(userController.protect, postControllers.comments)
  .get(postControllers.getComments);

module.exports = router;
