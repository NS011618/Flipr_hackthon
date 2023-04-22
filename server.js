const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = 4000;
app.use(express.json);
const userRoute = require("./routes/userRoute");

app.use("/api/users", userRoute);
app.listen(port, () => {
  console.log("server has started");
});
