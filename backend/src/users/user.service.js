const User = require("./user.model");

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

exports.getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};