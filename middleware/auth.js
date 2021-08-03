const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.isSignedIn =  (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

//isAdmin check
exports.isAdmin = async (req, res, next) => {
  const targetUser = await User.findById(req.user.id);
  const { role } = targetUser;

  //check if current user is admin or superAdmin
  //user who is a superAdmin have all the privileges
  //resources owned by an admin user
  if (!(role === "admin" || role === "superAdmin")) {
    return res.status(401).json({ error: "User do not have admin privilege" });
  }

  next();
};

// @desc Check if user has super admin privilege or not
exports.isSuperAdmin = async (req, res, next) => {
  const targetUser = await User.findById(req.user.id);
  const { role } = targetUser;

  if (!(role === "superAdmin")) {
    return res
      .status(401)
      .json({ error: "User do not have super admin privilege" });
  }

  next();
};

exports.isAuthorized = (currentUserId, verificationId) => {
  if (currentUserId.toString() !== verificationId.toString()) {
    return false;
  } else {
    return true;
  }
}

