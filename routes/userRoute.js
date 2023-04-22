const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = require('../middlewares/authMiddleware');

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hashSync(password, salt);

    req.body.password = hashedpassword;
    const user = new User(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    } else {
      await user.save();
      return res
        .status(200)
        .send({ message: "User created successfully", success: true });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User doesnot exist", success: false });
    }
    const passwordsMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordsMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "9h",
      });
      return res.status(200).send({
        message: "User logged in succesfully",
        success: true,
        data: token,
      });
    } else {
      return res
        .status(200)
        .send({ message: "password is incorrect", success: false });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post("/get-user-data", authMiddleware,async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);       
        user.password = undefined; 
        return res.status(200).send({ message: "user data fetched successfully", success: true, data:user});
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false });
    }
});

module.exports = router;
