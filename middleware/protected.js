function protected(req, res, next) {
  const { roles } = req.userInfo;

  if (!roles) {
    return res.status(401).json({ error: "Deletion is not permitted" });
  }

  if (roles.includes("Admin") || roles.includes("Manager")) {
    next();
  }
}

module.exports = protected;
