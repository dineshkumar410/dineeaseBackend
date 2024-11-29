const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Get JWT token from the request and adds user to the req
exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Authorization token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};

// Checks whether user is admin or normal user
exports.adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};
