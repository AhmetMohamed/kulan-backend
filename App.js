const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
const commentRoute = require("./Routes/commentRoute");
const app = express();

app.use(express.json());

dotenv.config({ path: "./.env" });
require("./Server");

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

const port = 8000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
