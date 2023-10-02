const User = require("../models/User");
const Note = require("../models/Note");

const asyncHandler = require("../middleware/asyncHandler");

// @desc    Get all users
// @route   GET /users
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(404).json({ success: false, message: "No users found" });
  }
  res.status(200).json({ success: true, data: users });
});

// @desc    Get single user
// @route   GET /users/:id
// @access  Private
exports.getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password").lean();
  if (!user) {
    return res.status(404).json({ success: false, message: "No user found" });
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Create user
// @route   POST /users
// @access  Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const { username, password, roles } = req.body;
  console.log(req.body);
  //Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({
      success: false,
      message: "Please provide a username, password and roles",
    });
  }

  //Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({
      success: false,
      message: "Username already exists",
    });
  }
  // Create user
  const user = await new User({
    username,
    password,
    roles,
  }).save();

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Failed to create user",
    });
  }

  res.status(201).json({ success: true, data: "User created successfully" });
});

// @desc    Update user
// @route   PATCH /users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { username, password, roles, active } = req.body;

  const id = req.params.id;

  //Confirm data
  if (!username || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({
      success: false,
      message: "Please provide a username, password and roles",
    });
  }

  // Find user and update
  const user = await User.findOne({ _id: id }).exec();
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Find duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({
      success: false,
      message: "Username already exists",
    });
  }

  // Update user
  user.username = username;
  if (password) {
    user.password = password;
  }
  user.roles = roles;
  user.active = active;

  const newUser = await user.save();

  res.status(200).json({ success: true, data: "User updated successfully" });
});

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide an id" });
  }

  const notes = await Note.findOne({ user: id }).lean();
  console.log(notes);
  if (notes) {
    return res.status(404).json({ success: false, message: "User has notes" });
  }

  const user = await User.findByIdAndDelete(id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(404).json({ success: false, message: "No user found" });
  }

  res.status(200).json({ success: true, data: "User deleted successfully" });
});
