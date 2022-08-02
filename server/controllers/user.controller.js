/* 
    User Controller
*/
// import user model
const User = require("../models/user.model");

// import transporter for sending email
const transporter = require("../config/transport.config");

// function to register a user
exports.registerUser = async (req, res) => {
  const body = req.body;
  try {
    // find if user already exists
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const newUser = await User.create(body);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// function to login a user
exports.loginUser = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(body.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// function to send an email to me with the user's message
exports.sendEmail = async (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.APP_EMAIL,
    subject: "Message from " + name,
    text: message,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent" });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

// export user controller
module.exports = exports;
