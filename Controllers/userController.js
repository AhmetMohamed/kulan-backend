const users = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    console.log(req.user);
    const user = await users.findOne({ email: req.body.email });

    //email is already existing
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // password !== confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(403)
        .json({ message: "Password must match confirm password" });
    }
    //password greater than 7
    if (req.body.password.length < 7) {
      return res
        .status(403)
        .json({ message: "Password must be at least 7 characters" });
    }
    //encrypted Password
    const encrypted = await bcrypt.hash(req.body.password, 10);
    req.body.password = encrypted;

    await users.create(req.body);
    res.status(200).json({ message: "user created successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.logIn = async (req, res) => {
  const user = await users.findOne({ email: req.body.email });
  //1. email exists
  if (!user) {
    res.status(400).json({ message: "Email is not exists" });
  }
  //2. password correct
  const decrypted = bcrypt.compare(req.body.password, users.password);
  if (decrypted === false) {
    res.status(400).json({ message: "Password incorrect" });
  }
  //3. login success
  res.status(200).json({ message: "successfully Login" });
};

exports.deleteUser = async (req, res) => {
  const user = await users.findByIdAndDelete(req.params.id);
  if (user) {
    return res.status(400).json({ message: "user is deleted successfully" });
  }

  res
    .status(200)
    .json({ message: "user is Not valid Enter enter valid Email" });
};

//Add Language to langagage array
exports.Addlanguges = async (req, res) => {
  const user = await users.findById(req.params.id);
  if (!user) {
    res.status(400).json({ message: "user is not valid" });
  }
  await user.updateOne({ $push: { language: req.body.language } });
  return res.status(200).json({ message: "language is added successfully" });
};
