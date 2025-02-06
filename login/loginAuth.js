const express = require("express");
const router = express.Router(); // Create a new router

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Correct path to your User model

// Login a user
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // In your login route
    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      "JWT_SECRET",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Export the router
module.exports = router;
