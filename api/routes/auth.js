const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//! register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });
    console.log("hash");
    await newUser.save();
    res.status(200).json("A new user created successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("🚀 ~ file: auth.js:27 ~ router.post ~ user:", user)
    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    console.log("🚀 ~ file: auth.js:32 ~ router.post ~ validPass:", validPass)

    if (!validPass) {
      res.status(400).json("Invalid Password");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
