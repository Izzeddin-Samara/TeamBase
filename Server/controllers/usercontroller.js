const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Register Function
  register: (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    newUser.confirmPassword = confirmPassword;

    newUser
      .save()
      .then((user) => res.json({ msg: "Success!", user }))
      .catch((err) => res.status(400).json(err));
  },

  // Login Function
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ error: "Email not found" });

      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword)
        return res.status(400).json({ error: "Invalid password" });

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      };

      res
        .cookie("usertoken", token, { httpOnly: true })
        .json({ msg: "success!", user: userData });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Something went wrong", details: err.message });
    }
  },

  // Logout Function
  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.json({ msg: "Logged out successfully" });
  },

  // checkEmail Function
  checkEmail: async (req, res) => {
    const { email } = req.query;
    const { excludeId } = req.query;

    try {
      const user = await User.findOne({ email });
      const exists = user && user._id.toString() !== excludeId;
      res.json({ exists });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
};
