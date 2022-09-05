const users = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    // console.log(req.user);
    const user = await users.findOne({ email: req.body.email });

    //email is already existing
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // password !== confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password must match confirm password" });
    }
    //password greater than 7
    if (req.body.password.length < 3) {
      return res
        .status(400)
        .json({ message: "Password must be at least 7 characters" });
    }
    //encrypted Password
    const encrypted = await bcrypt.hash(req.body.password, 10);
    req.body.password = encrypted;
    req.body.skills = req.body.skills.split(",");

    const token = jwt.sign(
      {
        data: { email: req.body.email },
        expiresAt: "1h",
      },
      process.env.JwtSecret
    );

    // console.log(token);

    req.body.image = req.file.filename;
    await users.create(req.body);
    // console.log(req.body);
    res.status(200).json({ message: "user created successfully", token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await users.findOne({ email: req.body.email });
    //1. email exists
    if (!user) {
      return res.status(400).json({ message: "Email is not exists" });
    }
    //2. password correct
    const decrypted = bcrypt.compare(req.body.password, user.password);
    if (decrypted === false) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    //WebToken
    const token = jwt.sign(
      {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          location: user.location,
          skills: user.skills,
        },
        expiresAt: "1h",
      },
      process.env.JwtSecret
    );

    //3. login success
    res.status(200).json({ message: "successfully Login", token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
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

exports.protect = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "Please Login" });
    }
    jwt.verify(token, process.env.JwtSecret, function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "Token Expired" });
      }
      // console.log(decoded.data);
      req.user = decoded.data;
    });
    next();
  } catch (e) {
    console.log(e);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const getuser = await users.findOne({ email: req.user.email });
    res.status(200).json({ message: "single user", data: getuser });
    // console.log(getuser);
  } catch (e) {
    console.log(e.message);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    //find all users from the database
    const user = await users.find({});
    // All found Post Questions
    res.status(200).json({ message: "All users", data: user });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
