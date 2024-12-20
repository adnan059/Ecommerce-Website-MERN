const jwt = require("jsonwebtoken");
const createError = require("./createError");

// ------------ verify token ------------
const verifyToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_Secret);

      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };

      next();
    } catch (error) {
      next(createError(498, "invalid token"));
    }
  } else {
    return next(createError(401, "your are not authenticated"));
  }
};

// verify an user
const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "you are not authorized"));
  }
};

// verify admin
const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "you are not authorized"));
  }
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
