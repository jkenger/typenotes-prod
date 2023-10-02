const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

// @desc    Get all notes
// @route   GET /notes
// @access  Private/Admin
exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find().populate("user").lean();
  if (!notes?.length) {
    return res.status(404).json({ success: false, error: "No notes found" });
  }

  res.status(200).json({ success: true, data: notes });
});

// @desc    Get single note
// @route   GET /notes/:id
// @access  Private/Admin
exports.getNotesById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide an id" });
  }

  const notes = await Note.find({ user: id }).populate("user").lean();
  console.log(notes);
  if (!notes) {
    return res.status(404).json({ success: false, error: "No note found" });
  }
  res.status(200).json({ success: true, data: notes });
});

// @desc    Create note
// @route   POST /notes
// @access  Public
exports.createNote = asyncHandler(async (req, res, next) => {
  const { title, text, id } = req.body;

  //Confirm data
  if (!title || !id || !text) {
    return res.status(400).json({
      success: false,
      error: "Please provide a title and content",
    });
  }

  // Only if user exist
  const userNotExist = await User.findById(id).lean();
  if (!userNotExist) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  // Check if duplicate
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res
      .status(400)
      .json({ success: false, error: "Note title already exists" });
  }

  // Create note
  const note = await new Note({
    user: id,
    title,
    text,
  }).save();

  if (!note) {
    return res.status(500).json({ success: false, error: "Server error" });
  }

  res.status(201).json({ success: true, data: "Note created successfully" });
});

// @desc    Update note
// @route   PUT /notes/:id
// @access  Private/Admin
exports.updateNote = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { title, text, completed } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide an id" });
  }

  if (!title || !text) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide a title and content" });
  }

  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(400).json({
      success: false,
      message: "Note title already exists",
      id: id,
      duplicate: duplicate._id,
    });
  }

  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(404).json({ success: false, error: "No note found" });
  }
  note.title = title;
  note.text = text;
  note.completed = completed;
  note.save();

  res.status(200).json({ success: true, data: "Note updated successfully" });
});

// @desc    Delete note
// @route   DELETE /notes/:id
// @access  Private/Admin || Private/Manager
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide an id" });
  }

  const note = await Note.findByIdAndDelete(id).lean().exec();

  if (!note) {
    return res.status(404).json({ success: false, error: "No note found" });
  }

  res.status(200).json({ success: true, data: "Note deleted successfully" });
});

// @desc    Get all notes for user
// @route   GET /notes/user/:id
// @access  Private/Admin || Private/Manager
exports.getNotesForUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide an id" });
  }

  const notes = await Note.find({ user: id }).lean().exec();

  if (!notes) {
    return res.status(404).json({ success: false, error: "No notes found" });
  }

  res.status(200).json({ success: true, data: notes });
});
