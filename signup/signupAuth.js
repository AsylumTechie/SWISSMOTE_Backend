const express = require("express");
const router = express.Router(); // Create a new router

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Correct path to your User model

// Register a new user
router.post("/register", async (req, res) => {

  const { email, password, userName } = req.body;

  // Check if email is missing or invalid
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!userName) {
    return res.status(400).json({ message: "User name is required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { email: user.email },
      });
  } catch (error) {
    console.error("Error registering user:", error.message); // Log the error message
    console.error("Error details:", error); // Log the complete error

    res.status(500).json({ message: "Error registering user", error });
  }
});

// Export the router
module.exports = router;
