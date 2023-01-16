const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();
const userRouter = express.Router();

// R E G I S T E R

userRouter.post("/register", (req, res) => {
  const { name, email, gender, password } = req.body;

  try {
    bcrypt.hash(password, 8, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hashedPassword,
        });
        await user.save();
        res.send("Registration Successfull");
      }
    });
  } catch (err) {
    console.log(err);
  }
});





// L  O  G  I  N

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      const hashedPassword = user[0].password;
      bcrypt.compare(password, hashedPassword, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({
            msg: "Login Success",
            token: token,
          });
        } else {
          res.send("Wrong Credentials");
          console.log(err);
        }
      });
    } else {
      res.send("login Failed");
    }
  } catch (err) {
    console.log(err);
    res.send("Something Went Wrong")
  }
});

module.exports = {
  userRouter,
};
