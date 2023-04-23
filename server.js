const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = 5000;
app.use(express.json());
const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.listen(port, () => {
  console.log("server has started");
});
