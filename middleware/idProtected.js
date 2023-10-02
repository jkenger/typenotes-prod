const Note = require("../models/Note");

async function idProtected(req, res, next) {
  const { id, roles } = req.userInfo;

  const isAdmin = roles?.includes("Admin");
  const isManager = roles?.includes("Manager");

  const paramsId = req.params.id;

  const note = await Note.findById(paramsId).lean();
  const userId = note?.user.toString();

  if (isAdmin || isManager) return next();
  if (id === userId) return next();
  if (id !== userId)
    return res
      .status(401)
      .json({ error: "You are not authorized to edit this note" });
}

module.exports = idProtected;
