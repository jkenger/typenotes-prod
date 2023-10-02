const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");
const protected = require("../middleware/protected.js");
const idProtected = require("../middleware/idProtected.js");
const verifyJWT = require("../middleware/verifyJWT.js");
router.use(verifyJWT);
router
  .route("/")
  .get(protected, usersController.getUsers)
  .post(protected, usersController.createUser);

router
  .route("/:id")
  .get(usersController.getUserById)
  .put(protected, usersController.updateUser)
  .delete(protected, usersController.deleteUser);

module.exports = router;
