const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.use(express.json());
const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");

const port = 5000;
app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.listen(port, () => {
  console.log("server has started");
});
