const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Register Function
  register: async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      newUser.confirmPassword = confirmPassword;

      const savedUser = await newUser.save();
      res.json({ msg: "Success!", user: savedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Login Function
  login: async (req, res) => {
    try {
      const users = await User.find({});
      // Normalize email before querying
      const email = req.body.email.trim().toLowerCase();

      console.log("Incoming login email:", email);

      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ error: "Email not found" });

      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword)
        return res.status(400).json({ error: "Invalid password" });

      req.session.userId = user._id;

      const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      };

      res.json({ msg: "Logged in successfully", user: userData });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Something went wrong", details: err.message });
    }
  },

  // Logout Function
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.json({ msg: "Logged out successfully" });
    });
  },

  checkEmail: async (req, res) => {
    const { email } = req.params;
    const { excludeId } = req.query;

    try {
      const user = await User.findOne({ email });
      const exists = user && user._id.toString() !== excludeId;
      res.json({ exists });
    } catch (err) {
      console.error("Error in checkEmail:", err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
