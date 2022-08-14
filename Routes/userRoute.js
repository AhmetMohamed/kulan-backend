const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.route("/signup").post(userController.signUp);
router.route("/login").post(userController.logIn);

router.route("/:id").delete(userController.deleteUser);

module.exports = router;
