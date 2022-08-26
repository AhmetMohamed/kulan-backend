const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const upload = require("../utils/Multer");

router.route("/signup").post(upload.single("image"), userController.signUp);

router.route("/login").post(userController.logIn);

router
  .route("/:id")
  .delete(userController.deleteUser)
  .get(userController.getOneUser);
module.exports = router;
