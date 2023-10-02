const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController.js");
const verifyJWT = require("../middleware/verifyJWT.js");
const protected = require("../middleware/protected.js");
const idProtected = require("../middleware/idProtected.js");

router.use(verifyJWT);

router
  .route("/")
  .get(notesController.getNotes)
  .post(notesController.createNote);
router
  .route("/:id")
  .get(notesController.getNotesById)
  .put(idProtected, notesController.updateNote)
  .delete(protected, notesController.deleteNote);

module.exports = router;
