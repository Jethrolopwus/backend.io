const { request } = require("express");
const user = require("../models/user.model");
const { compare } = require("bcrypt");
const aboutmidddleware = async (req, res, next) => {
  //find user in the database with email and password
  const { email, password } = req.body;
  try {
    const isValidUser = await user.findOne({ email });
    if (!isValidUser)
      return res.status(404).json({ message: "user not found" });

    const pwMatch = await compare(password, isValidUser.password);

    if (pwMatch) {
      return next();
    }
    return res.status(400).json({ msg: "invalid credentials" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const database =
  // authenticate user

  (module.exports = {
    aboutmidddleware,
  });
