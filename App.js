const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoute");
const postRoute = require("./Routes/postRoute");
const blogRoute = require("./Routes/blogRoute");
const app = express();

dotenv.config({ path: "./.env" });
require("./Server");

app.use(express.json());
app.use(cors());
app.use(express.static("images"));

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/blog", blogRoute);

const port = 8000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
