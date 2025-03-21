const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModal.js");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, "secretkey", { expiresIn: "1d" });
  
      // Send success response
      res.json({
        message: "Login successful",  // ✅ Added success message
        user: {
          name: user.name,
          email: user.email,
          role: user.role
        },
        token: token  // ✅ Include the token in the response
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
