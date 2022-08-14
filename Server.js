const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.usernameDB}:${process.env.passwordDB}@cluster1.fsjfad8.mongodb.net/kulan`
  )
  .then(() => console.log("Connected to DB✅"));
