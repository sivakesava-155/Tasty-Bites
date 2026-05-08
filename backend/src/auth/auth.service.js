const User = require("../users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../users/user.model");

exports.registerUser = async ({ name, email, password, role }) => {
  if (!password) {
    throw new Error("Password is required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  // ✅ HASH HERE
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name || email.split("@")[0],
    email,
    password: hashedPassword, // ✅ IMPORTANT
    role
  });

  return user;
};
exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};